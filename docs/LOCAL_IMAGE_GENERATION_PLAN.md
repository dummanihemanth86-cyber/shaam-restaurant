# Shaam local image generation: safe plan

## Current machine check (2026-11-19)

- Windows 10 Home Single Language, 64-bit (build 26300).
- Existing Python command: CPython 3.13.5. The `py` launcher did not enumerate an installed Python, so use the full `python.exe` path unless that is corrected later.
- Physical RAM: 7.28 GB total; 0.80 GB available during this check (88% in use). Available page file: 6.61 GB; page-file capacity is not equivalent to physical memory for image generation.
- C: has 118.9 GB free.
- GPU: AMD Radeon integrated graphics, 512 MB reported dedicated memory. No ComfyUI process, checked ComfyUI folders, or large Stable Diffusion model files were found in the checked locations.
- The existing `scripts/generate_food_images.py` remains in place. It only talks to a loopback ComfyUI service, skips existing WebP files, and logs failures.

## Compatibility and recommendation

ComfyUI's current project documentation says Python 3.13 is well supported; Python 3.12 is its fallback for dependency issues. ComfyUI runs in its own Python environment. Use a ComfyUI-managed/portable environment or a dedicated `C:\ComfyUI\.venv`; never install its dependencies into the website's Python or global packages.

ComfyUI documents a CPU-only `--cpu` mode and describes it as slow. Its AMD Windows instructions currently call for Windows 11 and a supported Radeon/Ryzen target; AMD's support matrix lists supported hardware rather than this integrated Radeon model. Therefore, do not plan on AMD GPU acceleration here. A 512x512 Stable Diffusion 1.5 CPU workflow is the lighter fallback, but the present 0.80 GB available RAM makes this PC unsuitable for a reliable test run right now. This is a resource assessment, not a claim that every possible optimized CPU configuration is impossible.

The 118.9 GB free disk space is ample for a separate ComfyUI install plus a model, but memory fails the preflight. Do not download a checkpoint until a fresh check shows materially more free physical RAM and the intended runtime has been selected.

## Safe next steps on this PC

1. Restart Windows and close memory-heavy apps. Recheck available physical RAM before installing anything.
2. If free RAM remains low, stop on this machine; do not attempt SDXL or an image batch.
3. If memory improves enough for a single 512x512 CPU trial, install ComfyUI in a dedicated folder with its own Python 3.13 environment (or its official portable runtime). Do not alter the existing Python 3.13 installation or the React project's dependencies.
4. Download only the Stable Diffusion 1.5 inference checkpoint from its model card after confirming the current memory and disk headroom. Use CPU mode for the first run; avoid AMD ROCm setup on this Windows 10 integrated GPU.
5. Generate only three samples first:

   ```powershell
   python scripts/generate_food_images.py --checkpoint v1-5-pruned-emaonly.safetensors --items chicken-biryani chicken-65 paneer-65
   ```

6. Open and inspect all three WebP files. After visual approval, resume the remaining items:

   ```powershell
   python scripts/generate_food_images.py --checkpoint v1-5-pruned-emaonly.safetensors
   ```

The script skips existing images, so restarting the batch is safe. Review the output before adding paths to `src/data/generatedImages.ts`.

## Alternative free workflow if this PC is still constrained

Use another local computer with more memory (preferably 16 GB or more installed RAM; this is a conservative recommendation, not a ComfyUI minimum) and a supported GPU if available. Install ComfyUI and a local SD 1.5 checkpoint there, copy this project/script, run the same three-sample command, and copy the approved WebP files back into this project's `public/images/menu/`. The generation remains local to that computer and uses no hosted API, API key, or paid service.

## Official references

- [ComfyUI Windows installation and Python compatibility](https://github.com/Comfy-Org/ComfyUI#installing)
- [ComfyUI startup flags: CPU mode and memory flags](https://github.com/Comfy-Org/docs/blob/main/development/comfyui-server/startup-flags.mdx)
- [AMD Radeon/Ryzen Windows support matrix](https://rocm.docs.amd.com/projects/radeon-ryzen/en/latest/docs/compatibility/compatibilityrad/windows/windows_compatibility.html)
- [Stable Diffusion 1.5 model card and local checkpoint instructions](https://huggingface.co/stable-diffusion-v1-5/stable-diffusion-v1-5)
