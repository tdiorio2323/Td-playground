#!/usr/bin/env node
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const imagesToOptimize = [
  'public/lovable-uploads/qp-billboard.png',
  'public/lovable-uploads/qp-reserve-tank-cd.png',
  'public/verde-logo.png',
  'public/lovable-uploads/star-lock.png',
  'public/lovable-uploads/tdsparklesblack.jpg',
];

async function optimizeImage(inputPath) {
  try {
    const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    console.log(`Optimizing ${inputPath}...`);

    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);

    const originalStats = await stat(inputPath);
    const optimizedStats = await stat(outputPath);

    const reduction = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);

    console.log(`✓ ${inputPath}`);
    console.log(`  Original: ${(originalStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Optimized: ${(optimizedStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Savings: ${reduction}%\n`);

  } catch (error) {
    console.error(`✗ Failed to optimize ${inputPath}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');

  for (const imagePath of imagesToOptimize) {
    await optimizeImage(imagePath);
  }

  console.log('✅ Image optimization complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Update image references in your code to use .webp extensions');
  console.log('   2. Add <picture> elements with fallbacks for better browser support');
  console.log('   3. Consider deleting original large PNG/JPG files after testing');
}

main();
