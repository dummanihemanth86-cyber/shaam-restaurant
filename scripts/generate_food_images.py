#!/usr/bin/env python3
"""Generate Shaam menu photos through a local ComfyUI server.

This script only contacts a loopback ComfyUI endpoint. It never calls a hosted
image API. Existing destination WebP files are skipped and are never replaced.
"""

from __future__ import annotations

import argparse
import json
import logging
import random
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid
from pathlib import Path
from typing import Any


PROJECT_ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = PROJECT_ROOT / "public" / "images" / "menu"
LOG_PATH = PROJECT_ROOT / "scripts" / "generate_food_images.log"

STYLE = (
    "premium Indian restaurant commercial food photography, one serving of the named dish only, "
    "authentic Indian ingredients and believable texture, elegant dark charcoal plate on a deep black "
    "table, subtle metallic gold accents in the setting, warm cinematic golden side lighting, "
    "professional DSLR, realistic natural food colors, crisp detailed food, shallow depth of field, "
    "square composition, no people"
)

NEGATIVE = (
    "text, letters, words, watermark, logo, menu, collage, multiple dishes, extra plates, "
    "extra food, people, hands, illustration, cartoon, plastic-looking food, oversaturated, "
    "blurred dish, deformed ingredients, duplicate objects, border"
)

# Filenames intentionally match the requested image names. `menu_id` may differ
# from a site's existing id; the generated path can be wired to that item later.
FOODS: dict[str, tuple[str, str]] = {
    "chicken-biryani": ("Chicken Biryani", "chicken-biryani"),
    "mutton-biryani": ("Mutton Biryani", "mutton-biryani"),
    "veg-biryani": ("Vegetable Biryani", "veg-biryani"),
    "chicken-mandi": ("Chicken Mandi", "chicken-mandi"),
    "mutton-mandi": ("Mutton Mandi", "mutton-mandi"),
    "chicken-65": ("Chicken 65", "chicken-65"),
    "chicken-manchuria": ("Chicken Manchuria", "chicken-manchuria"),
    "chicken-lollipop": ("Chicken Lollipop", "chicken-lollipop"),
    "chicken-majestic": ("Chicken Majestic", "chicken-majestic"),
    "apollo-fish": ("Apollo Fish", "apollo-fish"),
    "chilli-prawns": ("Chilli Prawns", "chilli-prawns"),
    "paneer-65": ("Paneer 65", "paneer-65"),
    "paneer-manchuria": ("Paneer Manchuria", "paneer-manchuria"),
    "butter-chicken": ("Butter Chicken", "butter-chicken"),
    "andhra-chicken": ("Andhra Chicken Curry", "andhra-chicken"),
    "telangana-chicken": ("Telangana Chicken Curry", "telangana-chicken"),
    "mutton-curry": ("Mutton Curry", "mutton-curry"),
    "fish-curry": ("Fish Curry", "fish-curry"),
    "chicken-fried-rice": ("Chicken Fried Rice", "chicken-fried-rice"),
    "veg-fried-rice": ("Vegetable Fried Rice", "veg-fried-rice"),
    "chicken-noodles": ("Chicken Soft Noodles", "chicken-noodles"),
    "tandoori-chicken": ("Tandoori Chicken", "tandoori-chicken"),
    "chicken-tikka": ("Chicken Tikka", "chicken-tikka"),
}


def configure_logging() -> None:
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s",
        handlers=[logging.FileHandler(LOG_PATH, encoding="utf-8"), logging.StreamHandler()],
    )


def local_base_url(value: str) -> str:
    parsed = urllib.parse.urlparse(value)
    if parsed.scheme not in {"http", "https"} or parsed.hostname not in {"localhost", "127.0.0.1", "::1"}:
        raise argparse.ArgumentTypeError("ComfyUI URL must point to localhost (no hosted APIs are used).")
    return value.rstrip("/")


def request_json(url: str, payload: dict[str, Any] | None = None, timeout: int = 30) -> Any:
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    request = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"} if data is not None else {},
        method="POST" if data is not None else "GET",
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        body = response.read()
    return json.loads(body) if body else {}


def make_workflow(
    name: str,
    checkpoint: str,
    seed: int,
    width: int,
    height: int,
    steps: int,
    cfg: float,
    sampler: str,
    scheduler: str,
) -> dict[str, Any]:
    positive = f"{name}, {STYLE}"
    return {
        "1": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": checkpoint}},
        "2": {"class_type": "CLIPTextEncode", "inputs": {"text": positive, "clip": ["1", 1]}},
        "3": {"class_type": "CLIPTextEncode", "inputs": {"text": NEGATIVE, "clip": ["1", 1]}},
        "4": {"class_type": "EmptyLatentImage", "inputs": {"width": width, "height": height, "batch_size": 1}},
        "5": {
            "class_type": "KSampler",
            "inputs": {
                "seed": seed,
                "steps": steps,
                "cfg": cfg,
                "sampler_name": sampler,
                "scheduler": scheduler,
                "denoise": 1.0,
                "model": ["1", 0],
                "positive": ["2", 0],
                "negative": ["3", 0],
                "latent_image": ["4", 0],
            },
        },
        "6": {"class_type": "VAEDecode", "inputs": {"samples": ["5", 0], "vae": ["1", 2]}},
        "7": {
            "class_type": "SaveImage",
            "inputs": {"filename_prefix": f"shaam-local/{name.lower().replace(' ', '-')}", "images": ["6", 0]},
        },
    }


def wait_for_image(base_url: str, prompt_id: str, timeout: int) -> dict[str, Any]:
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        history = request_json(f"{base_url}/history/{prompt_id}", timeout=30)
        prompt = history.get(prompt_id)
        if prompt:
            outputs = prompt.get("outputs", {})
            images = [image for node in outputs.values() for image in node.get("images", [])]
            if images:
                return images[0]
            status = prompt.get("status", {})
            if status.get("status_str") == "error" or status.get("completed") is False:
                raise RuntimeError(f"ComfyUI reported a generation error: {status}")
        time.sleep(2)
    raise TimeoutError(f"Timed out waiting for ComfyUI job {prompt_id} after {timeout}s")


def save_webp(base_url: str, image: dict[str, Any], destination: Path, quality: int) -> None:
    try:
        from PIL import Image, ImageOps
    except ImportError as exc:
        raise RuntimeError("Pillow is required to convert ComfyUI PNG output to WebP. Install with: python -m pip install Pillow") from exc

    query = urllib.parse.urlencode(
        {"filename": image["filename"], "subfolder": image.get("subfolder", ""), "type": image.get("type", "output")}
    )
    request = urllib.request.Request(f"{base_url}/view?{query}")
    with urllib.request.urlopen(request, timeout=120) as response:
        from io import BytesIO

        with Image.open(BytesIO(response.read())) as source:
            prepared = ImageOps.fit(source.convert("RGB"), (512, 512), method=Image.Resampling.LANCZOS)
            # Exclusive creation ensures even an unexpected race cannot overwrite an image.
            with destination.open("xb") as target:
                prepared.save(target, format="WEBP", quality=quality, method=6)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", type=local_base_url, default="http://127.0.0.1:8188", help="Local ComfyUI URL")
    parser.add_argument("--checkpoint", default="v1-5-pruned-emaonly.safetensors", help="Checkpoint filename already installed in ComfyUI/models/checkpoints")
    parser.add_argument("--items", nargs="*", choices=sorted(FOODS), help="Optional item IDs; defaults to all 23 listed dishes")
    parser.add_argument("--width", type=int, default=512)
    parser.add_argument("--height", type=int, default=512)
    parser.add_argument("--steps", type=int, default=20)
    parser.add_argument("--cfg", type=float, default=6.5)
    parser.add_argument("--sampler", default="euler")
    parser.add_argument("--scheduler", default="normal")
    parser.add_argument("--quality", type=int, default=84)
    parser.add_argument("--timeout", type=int, default=1800, help="Per-image timeout in seconds")
    parser.add_argument("--seed", type=int, help="Base random seed")
    args = parser.parse_args()

    if args.width < 256 or args.height < 256 or args.width % 8 or args.height % 8:
        parser.error("Image dimensions must be at least 256 and divisible by 8.")
    if not 1 <= args.quality <= 100:
        parser.error("WebP quality must be from 1 to 100.")

    configure_logging()
    selected = args.items or list(FOODS)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    rng = random.Random(args.seed)

    try:
        request_json(f"{args.url}/system_stats", timeout=10)
    except (OSError, urllib.error.URLError, TimeoutError) as exc:
        logging.error("Local ComfyUI is unavailable at %s: %s", args.url, exc)
        return 2

    failures = 0
    for item_id in selected:
        dish, filename = FOODS[item_id]
        destination = OUTPUT_DIR / f"{filename}.webp"
        if destination.exists():
            logging.info("SKIP existing image (never overwriting): %s", destination.name)
            continue

        try:
            workflow = make_workflow(
                dish, args.checkpoint, rng.randrange(0, 2**63), args.width, args.height,
                args.steps, args.cfg, args.sampler, args.scheduler,
            )
            queued = request_json(f"{args.url}/prompt", {"prompt": workflow, "client_id": str(uuid.uuid4())}, timeout=60)
            prompt_id = queued.get("prompt_id")
            if not prompt_id:
                raise RuntimeError(f"ComfyUI rejected the workflow: {queued}")
            logging.info("QUEUED %s (%s)", dish, prompt_id)
            image = wait_for_image(args.url, prompt_id, args.timeout)
            save_webp(args.url, image, destination, args.quality)
            logging.info("SAVED %s", destination)
        except Exception as exc:  # continue so a single failed item does not stop the batch
            failures += 1
            logging.exception("FAILED %s: %s", dish, exc)

    logging.info("Finished: %d selected, %d failures. Review the generated photos before enabling them in the site.", len(selected), failures)
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
