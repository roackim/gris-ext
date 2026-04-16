# Icons Directory

This directory contains icons for the Grayscale Toggle extension.

## Required Icon Files

The extension needs the following PNG files:
- `icon-16.png` (16x16 pixels)
- `icon-32.png` (32x32 pixels)
- `icon-48.png` (48x48 pixels)
- `icon-96.png` (96x96 pixels)

## Generating Icons

### Option 1: Using ImageMagick (if installed)

```bash
# From the icons directory
convert icon.svg -resize 16x16 icon-16.png
convert icon.svg -resize 32x32 icon-32.png
convert icon.svg -resize 48x48 icon-48.png
convert icon.svg -resize 96x96 icon-96.png
```

### Option 2: Using Inkscape (if installed)

```bash
inkscape icon.svg --export-filename=icon-16.png --export-width=16 --export-height=16
inkscape icon.svg --export-filename=icon-32.png --export-width=32 --export-height=32
inkscape icon.svg --export-filename=icon-48.png --export-width=48 --export-height=48
inkscape icon.svg --export-filename=icon-96.png --export-width=96 --export-height=96
```

### Option 3: Online Converter

1. Upload `icon.svg` to an online SVG to PNG converter (e.g., cloudconvert.com)
2. Generate PNG files at the required sizes
3. Save them in this directory

### Option 4: Use a Design Tool

Open `icon.svg` in a tool like GIMP, Figma, or Adobe Illustrator and export at the required sizes.

## Temporary Solution

If you want to test the extension without proper icons, you can create simple placeholder PNG files, but they won't look professional. The extension will still function correctly.
