"""Copy a built-in image generation result into the Shaam menu asset folders."""

from __future__ import annotations

import argparse
import re
import shutil
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
MENU = ROOT / "public" / "images" / "menu"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", required=True, help="lowercase dish filename slug")
    parser.add_argument("--source", required=True, type=Path, help="generated PNG file")
    args = parser.parse_args()

    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", args.slug):
        parser.error("slug must contain lowercase letters, digits, and hyphens")
    source = args.source.resolve(strict=True)
    if not source.is_file():
        parser.error("source must be a file")

    original = MENU / "originals" / f"{args.slug}.png"
    master = MENU / "originals-4k" / f"{args.slug}-3840-upscaled.png"
    webp = MENU / f"{args.slug}-ai.webp"
    outputs = (original, master, webp)
    existing = [str(path) for path in outputs if path.exists()]
    if existing:
        raise FileExistsError("Will not overwrite existing output(s): " + ", ".join(existing))

    for folder in (original.parent, master.parent):
        folder.mkdir(parents=True, exist_ok=True)

    with Image.open(source) as source_image:
        image = source_image.convert("RGB")
        native_size = image.size
        image.save(original, "PNG", optimize=True)
        image.resize((3840, 3840), Image.Resampling.LANCZOS).save(master, "PNG", optimize=True)
        image.resize((1024, 1024), Image.Resampling.LANCZOS).save(webp, "WEBP", quality=90, method=6)

    print(f"{args.slug}: native={native_size[0]}x{native_size[1]}; upscaled={master}; webp={webp}")


if __name__ == "__main__":
    main()
