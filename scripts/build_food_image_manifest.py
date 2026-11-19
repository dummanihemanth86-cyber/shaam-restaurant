"""Build a status manifest for the requested Shaam food image collection."""

from __future__ import annotations

import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
MENU_DIR = ROOT / "public" / "images" / "menu"
MANIFEST = MENU_DIR / "image-manifest.json"
def dimensions(path: Path) -> list[int] | None:
    if not path.is_file():
        return None
    try:
        with Image.open(path) as image:
            image.verify()
        with Image.open(path) as image:
            return [image.width, image.height]
    except Exception:
        return None


def main() -> None:
    node = (
        "import { menuItems } from './src/data/menu.ts'; "
        "console.log(JSON.stringify(menuItems.map(({id,name,category,image})=>({id,name,category,image}))))"
    )
    result = subprocess.run(
        ["node", "--input-type=module", "-e", node],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    items = json.loads(result.stdout)
    rows = []
    for item in items:
        slug = item["id"]
        ai_file = f"{slug}-ai.webp"
        ai_path = MENU_DIR / ai_file
        current_rel = item["image"].removeprefix("/images/menu/")
        current_path = MENU_DIR / current_rel
        source_path = MENU_DIR / "originals" / f"{slug}.png"
        upscale_path = MENU_DIR / "originals-4k" / f"{slug}-3840-upscaled.png"
        generated = dimensions(ai_path) is not None and source_path.is_file() and upscale_path.is_file()
        rows.append(
            {
                "id": slug,
                "dish": item["name"],
                "category": item["category"],
                "filename": ai_file,
                "generationStatus": "completed" if generated else "pending",
                "nativeSourceDimensions": dimensions(source_path),
                "upscaledMaster": str(upscale_path.relative_to(ROOT)).replace("\\", "/") if upscale_path.is_file() else None,
                "upscaledMasterDimensions": dimensions(upscale_path),
                "optimizedWebpDimensions": dimensions(ai_path),
                "optimizationStatus": "1024px WebP created" if dimensions(ai_path) else "pending",
                "currentMenuImage": item["image"],
                "currentMenuImageDimensions": dimensions(current_path),
            }
        )

    # The prompt asks for Prawns Biryani, which is not in the verified menu data.
    # Track its generated asset without claiming menu availability or price.
    prawns_source = MENU_DIR / "originals" / "prawns-biryani.png"
    prawns_master = MENU_DIR / "originals-4k" / "prawns-biryani-3840-upscaled.png"
    prawns_webp = MENU_DIR / "prawns-biryani-ai.webp"
    prawns_generated = dimensions(prawns_webp) is not None and prawns_source.is_file() and prawns_master.is_file()
    rows.append(
        {
            "id": "prawns-biryani",
            "dish": "Prawns Biryani",
            "category": "Biryani",
            "filename": "prawns-biryani-ai.webp",
            "generationStatus": "completed" if prawns_generated else "pending",
            "nativeSourceDimensions": dimensions(prawns_source),
            "upscaledMaster": str(prawns_master.relative_to(ROOT)).replace("\\", "/") if prawns_master.is_file() else None,
            "upscaledMasterDimensions": dimensions(prawns_master),
            "optimizedWebpDimensions": dimensions(prawns_webp),
            "optimizationStatus": "1024px WebP created" if dimensions(prawns_webp) else "pending",
            "currentMenuImage": None,
            "currentMenuImageDimensions": None,
            "menuIntegrationStatus": "not-in-current-menu; price and availability unverified",
        }
    )
    manifest = {
        "project": "Shaam Restaurant",
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "generationOutput": "The built-in generator currently outputs 1254x1254 PNG. 3840x3840 files are Lanczos upscales, not native 4K captures.",
        "requestedDishCount": len(rows),
        "completedAiImages": sum(row["generationStatus"] == "completed" for row in rows),
        "items": rows,
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {MANIFEST.relative_to(ROOT)}: {manifest['completedAiImages']}/{len(rows)} AI images generated")


if __name__ == "__main__":
    main()
