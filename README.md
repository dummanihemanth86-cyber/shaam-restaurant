# Shaam Restaurant Official Website

A responsive restaurant showcase built with React, Vite, TypeScript, Tailwind CSS, Framer Motion and Lucide. It runs without a backend. Menu data and business details are stored in editable TypeScript files.

## Local development

Requirements: Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm run dev
```

Vite prints the local URL. To create and preview a production build:

```bash
npm run build
npm run preview
```

The build creates `dist/`, including `robots.txt` and `sitemap.xml`. Set `VITE_SITE_URL` to the verified public HTTPS site origin before building for production; without it, canonical tags are omitted and the sitemap is empty rather than claiming an unverified domain.

## Editable restaurant information

- `src/data/restaurant.ts`: name, address, Google Maps links, coordinates and optional contact details.
- `src/data/menu.ts`: item names, categories, single/full prices, dietary labels, availability, image paths and price verification.
- `src/data/generatedImages.ts`: allowlist of generated WebP assets that are ready to display.
- `public/images/menu/ASSET_SLOTS.md`: original food image brief and expected filenames.
- `src/App.tsx`: page content, gallery entries, SEO titles and descriptions.
- `src/styles.css`: colors, typography, responsive layouts and motion.

Menu names and prices in `src/data/menu.ts` follow the restaurant supplied list in the project brief. Each item carries a `priceVerified` flag. Prices supplied in that list are marked verified; Biryani, Mandi and Tandoori prices stay `null` and display a call-to-confirm message. No ₹0 or fabricated price is shown.

The menu has 84 individually generated AI food images: 83 connected to menu items plus Prawns Biryani, whose menu availability and price are unverified and therefore not listed. Native generator outputs are 1254×1254 PNGs, preserved in `public/images/menu/originals/`; 3840×3840 masters are Lanczos upscales in `public/images/menu/originals-4k/`, and 1024×1024 WebP menu images are in `public/images/menu/`. The 4K files are upscaled masters, not native 4K captures. Image dimensions, processing and integration status are tracked in `public/images/menu/image-manifest.json`. Existing prices were not changed. No hosted image API or API key was used. The restaurant phone supplied in the brief is wired to `tel:+918143787875`; WhatsApp and opening hours remain unset because no official WhatsApp number or hours were provided.

The contact form is a transparent local demonstration: it saves a name and enquiry to browser storage after consent, and does not transmit the message. Connect it to an approved inbox/backend and update the privacy notice before accepting customer enquiries in production. There is no admin dashboard, authentication, ordering, delivery or payment module in this showcase build.

Call-to-order links use `tel:+918143787575`. A call opens the visitor's phone dialler; the website does not claim an order was placed. No WhatsApp button is shown because an official WhatsApp number was not supplied.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repository in Vercel. Framework preset: Vite; build command: `npm run build`; output directory: `dist`.
3. Add `VITE_SITE_URL` as a production build environment variable, using the public HTTPS origin after its domain is verified and configured.
4. Deploy. `vercel.json` rewrites client-side routes to `index.html` and adds baseline security headers.
5. In Vercel project settings, add the chosen custom domain. Follow Vercel's displayed DNS instructions at the domain registrar, then wait for HTTPS provisioning.
6. Rebuild/redeploy after setting the final origin. Confirm canonical tags, `/robots.txt` and `/sitemap.xml`, then submit the sitemap in Google Search Console and connect the verified Google Business Profile.

The suggested names `shaamrestaurant.in`, `shaamrestaurant.com` and `shaamfood.in` have not been confirmed as available or registered. Availability can change; check the exact name with an accredited registrar immediately before purchase. No domain was purchased or hosting account configured as part of this code change.

## Performance, accessibility and SEO

- Page titles, descriptions, Open Graph text and Restaurant JSON-LD are set per route. Structured data includes only the supplied location and Maps link, and deliberately omits ratings and opening hours.
- Canonical URLs and an absolute sitemap are generated only when `VITE_SITE_URL` is set.
- Generated menu images are served locally, with lazy loading and descriptive alt text. `src/data/generatedImages.ts` lists the generated assets used by the menu.
- Navigation, filters, forms, gallery lightbox and reduced-motion preference support are included. Verify with keyboard and screen reader before launch.

## Deployment security notes

`vercel.json` sets HSTS, a restrictive referrer policy, MIME sniffing protection, frame restrictions and a permissions policy. This frontend has no secrets or database credentials. If a server is added, implement server-side validation, CSRF protection where needed, rate limiting, secure authentication and file upload controls before exposing admin or enquiry endpoints.

## Launch checklist

- Confirm spelling, all menu items, single/full price meaning, current availability and every price with the restaurant.
- Confirm current dish availability and the unverified Biryani, Mandi and Tandoori prices. The phone link uses the number supplied in the project brief.
- When the local hardware has enough free memory and ComfyUI plus an SD 1.5 checkpoint are installed, generate the three review images with `python scripts/generate_food_images.py --items chicken-biryani chicken-65 paneer-65`. Review them before starting the 23-image batch and enabling images in `src/data/generatedImages.ts`.
- Confirm an official WhatsApp number, email and current opening hours before adding those details.
- Confirm the domain registration and business's permission to use it; configure production `VITE_SITE_URL`.
- Replace the local-only contact demonstration with an explicitly approved delivery method before inviting customers to submit enquiries.
- Run `npm run build`, inspect mobile and desktop routes, check image loading and metadata, and verify maps links after deployment.
