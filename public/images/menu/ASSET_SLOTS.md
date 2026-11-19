# Shaam menu photo assets

One individual, original food photograph is planned for each menu item. The WebP paths below match each card in `src/data/menu.ts`.

## Current image status

Ninety-nine screenshot-cropped WebP assets from user-supplied images are preserved. Six separate AI-generated photos are now integrated for Veg Manchuria, Paneer 65, Paneer Manchuria, Chilli Paneer, Veg Spring Roll, and Ginger Veg Manchuria. The built-in generator outputs 1254x1254 PNG; the 3840x3840 masters are Lanczos upscales and are labeled accordingly, with 1024px WebP menu copies. All 83 current menu items still have reviewed local images enabled. The requested image manifest is `image-manifest.json` (84 target dishes; Prawns Biryani is excluded from menu data because it is not in the verified restaurant menu). Enabled paths are in `src/data/generatedImages.ts`. The local-only generator is `scripts/generate_food_images.py`; it sends jobs only to a ComfyUI server on localhost, skips existing WebP files, and records failures in `scripts/generate_food_images.log`. It covers the 23 requested dishes. Other menu items retain their image slots until their photos are added and reviewed.

Current resource details and the safe install decision are documented in `docs/LOCAL_IMAGE_GENERATION_PLAN.md`. The latest check found only 0.8 GB free RAM, so no model was downloaded and no generation test was run. The current PC is not suitable for a reliable run; use a stronger local computer if available. The local generator itself remains ready to connect to ComfyUI.

Once ComfyUI is running locally with an installed SD 1.5 checkpoint, generate the three review images first:

```powershell
python scripts/generate_food_images.py --checkpoint v1-5-pruned-emaonly.safetensors --items chicken-biryani chicken-65 paneer-65
```

Review those files in `public/images/menu/` before running the full batch:

```powershell
python scripts/generate_food_images.py --checkpoint v1-5-pruned-emaonly.safetensors
```

The script never overwrites existing WebP files. Menu image paths should be enabled in `src/data/generatedImages.ts` only after reviewing the generated files.

## Image treatment

Photorealistic Indian restaurant food photography, believable dish styling, natural food colors, refined dark charcoal tabletop, warm golden side light, sharp professional DSLR detail, square WebP crop. No text, logos, watermarks, extra food or people.

## Veg Starters

- `/images/menu/veg-manchuria.webp` — Veg Manchuria
- `/images/menu/paneer-65.webp` — Paneer 65
- `/images/menu/paneer-manchurian.webp` — Paneer Manchuria
- `/images/menu/chilli-paneer.webp` — Chilli Paneer
- `/images/menu/veg-spring-roll.webp` — Veg Spring Roll
- `/images/menu/ginger-veg-manchuria.webp` — Ginger Veg Manchuria

## Soups

- `/images/menu/chicken-hot-soup.webp` — Chicken Hot & Soup
- `/images/menu/chicken-manchuria-soup.webp` — Chicken Manchuria Soup
- `/images/menu/chicken-noodles-soup.webp` — Chicken Noodles Soup
- `/images/menu/veg-hot-soup.webp` — Veg Hot & Soup

## Fried Rice

- `/images/menu/veg-fried-rice.webp` — Veg Fried Rice
- `/images/menu/schezwan-fried-rice.webp` — Schezwan Fried Rice
- `/images/menu/paneer-fried-rice.webp` — Paneer Fried Rice
- `/images/menu/mushroom-fried-rice.webp` — Mushroom Fried Rice
- `/images/menu/jeera-rice.webp` — Jeera Rice
- `/images/menu/curd-rice.webp` — Curd Rice
- `/images/menu/veg-pulav.webp` — Veg Pulav
- `/images/menu/chicken-fried-rice.webp` — Chicken Fried Rice
- `/images/menu/double-egg-fried-rice.webp` — Double Egg Fried Rice
- `/images/menu/mix-fried-rice.webp` — Mix Fried Rice

## Non-Veg Starters

- `/images/menu/egg-65.webp` — Egg 65
- `/images/menu/egg-manchuria.webp` — Egg Manchuria
- `/images/menu/egg-fry.webp` — Egg Fry
- `/images/menu/egg-bujji.webp` — Egg Bujji
- `/images/menu/apollo-fish.webp` — Apollo Fish
- `/images/menu/chicken-fry.webp` — Chicken Fry
- `/images/menu/loose-prawns.webp` — Loose Prawns
- `/images/menu/chilli-prawns.webp` — Chilli Prawns
- `/images/menu/chicken-65.webp` — Chicken 65
- `/images/menu/chicken-manchuria.webp` — Chicken Manchuria
- `/images/menu/chicken-lollipop.webp` — Chicken Lollipop
- `/images/menu/chicken-chilli.webp` — Chicken Chilli
- `/images/menu/ginger-chicken.webp` — Ginger Chicken
- `/images/menu/chicken-majestic.webp` — Chicken Majestic
- `/images/menu/chicken-555.webp` — Chicken 555
- `/images/menu/schezwan-chicken.webp` — Schezwan Chicken
- `/images/menu/kaju-chicken.webp` — Kaju Chicken
- `/images/menu/mutton-fry.webp` — Mutton Fry
- `/images/menu/mutton-65.webp` — Mutton 65

## Chinese

- `/images/menu/veg-soft-noodles.webp` — Veg Soft Noodles
- `/images/menu/veg-schezwan-noodles.webp` — Veg Schezwan Noodles
- `/images/menu/egg-soft-noodles.webp` — Egg Soft Noodles
- `/images/menu/double-egg-noodles.webp` — Double Egg Soft Noodles
- `/images/menu/chicken-soft-noodles.webp` — Chicken Soft Noodles
- `/images/menu/schezwan-chicken-noodles.webp` — Schezwan Chicken Soft Noodles
- `/images/menu/double-chicken-noodles.webp` — Double Chicken Noodles

## Chicken Curries

- `/images/menu/chicken-curry.webp` — Chicken Curry
- `/images/menu/chicken-masala.webp` — Chicken Masala
- `/images/menu/garlic-chicken.webp` — Garlic Chicken
- `/images/menu/butter-chicken.webp` — Butter Chicken
- `/images/menu/afghani-chicken.webp` — Afghani Chicken
- `/images/menu/telangana-chicken.webp` — Telangana Chicken
- `/images/menu/andhra-chicken.webp` — Andhra Chicken
- `/images/menu/kadai-chicken.webp` — Kadai Chicken
- `/images/menu/mathi-chicken.webp` — Mathi Chicken
- `/images/menu/punjabi-chicken.webp` — Punjabi Chicken
- `/images/menu/chicken-moghalai.webp` — Chicken Moghalai
- `/images/menu/kali-mirchi-chicken.webp` — Kali Mirchi Chicken
- `/images/menu/achari-murgh-chicken.webp` — Achari Murgh Chicken

## Mutton Curries

- `/images/menu/mutton-curry.webp` — Mutton Curry
- `/images/menu/mutton-masala.webp` — Mutton Masala
- `/images/menu/mutton-rogan-curry.webp` — Mutton Rogan Curry
- `/images/menu/kadai-mutton.webp` — Kadai Mutton
- `/images/menu/mutton-moghalai.webp` — Mutton Moghalai

## Fish Curries

- `/images/menu/fish-curry.webp` — Fish Curry
- `/images/menu/fish-masala.webp` — Fish Masala
- `/images/menu/kadai-fish.webp` — Kadai Fish
- `/images/menu/prawns-curry.webp` — Prawns Curry
- `/images/menu/prawns-masala.webp` — Prawns Masala
- `/images/menu/kadai-prawns.webp` — Kadai Prawns

## Biryani

- `/images/menu/chicken-biryani.webp` — Chicken Biryani
- `/images/menu/mutton-biryani.webp` — Mutton Biryani
- `/images/menu/veg-biryani.webp` — Veg Biryani
- `/images/menu/special-chicken-biryani.webp` — Special Chicken Biryani
- `/images/menu/egg-biryani.webp` — Egg Biryani

## Mandi

- `/images/menu/chicken-mandi.webp` — Chicken Mandi
- `/images/menu/mutton-mandi.webp` — Mutton Mandi
- `/images/menu/special-chicken-mandi.webp` — Special Chicken Mandi
- `/images/menu/family-mandi.webp` — Family Mandi
- `/images/menu/grilled-chicken-mandi.webp` — Grilled Chicken Mandi

## Tandoori

- `/images/menu/tandoori-chicken.webp` — Tandoori Chicken
- `/images/menu/grilled-chicken.webp` — Grilled Chicken
- `/images/menu/chicken-tikka.webp` — Chicken Tikka
