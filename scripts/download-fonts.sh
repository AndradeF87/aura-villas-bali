#!/bin/bash

# Create font directories
mkdir -p public/fonts/inter
mkdir -p public/fonts/playfair

# Download Inter fonts
echo "Downloading Inter fonts..."
curl -L "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" -o inter.css

# Download Playfair Display fonts
echo "Downloading Playfair Display fonts..."
curl -L "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" -o playfair.css

echo "Fonts CSS downloaded. Please manually extract font URLs and download the font files."
