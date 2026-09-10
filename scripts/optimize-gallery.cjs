const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const WE_DIR = path.join(__dirname, '..', 'public', 'we');

async function run() {
  const files = fs.readdirSync(WE_DIR).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg'));
  console.log(`Found ${files.length} images to optimize in ${WE_DIR}...`);

  let processed = 0;
  for (const file of files) {
    const inputPath = path.join(WE_DIR, file);
    const baseName = path.parse(file).name;
    const outputPath = path.join(WE_DIR, `${baseName}.webp`);

    try {
      await sharp(inputPath)
        .rotate() // Automatically orient based on EXIF
        .resize(1200, null, { withoutEnlargement: true })
        .webp({ quality: 80, effort: 4 })
        .toFile(outputPath);

      processed++;
      if (processed % 10 === 0 || processed === files.length) {
        console.log(`Processed ${processed}/${files.length} images...`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  console.log(`All ${processed} images successfully optimized to WebP!`);
}

run().catch(console.error);
