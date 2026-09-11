import fs from 'fs';
import path from 'path';

const CLOUD_NAME = 'lh8mihme';
const UPLOAD_PRESET = 'ipvswebsite';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const MAP_OUTPUT_PATH = 'src/data/cloudinaryMap.json';

// Helper to find files
function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else {
      results.push(filePath);
    }
  }
  return results;
}

async function uploadFile(filePath, relativeKey) {
  const fileBuffer = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  const ext = path.extname(filePath);
  const baseName = path.basename(filePath, ext);
  
  const safeBaseName = path.basename(filePath, ext).replace(/[^a-zA-Z0-9_\-\.]/g, '_');
  
  // Format public_id clean path
  const folderPart = path.dirname(relativeKey).replace(/\\/g, '/');
  const publicId = `ipvs-website/${folderPart === '.' ? '' : folderPart + '/'}${safeBaseName}`;

  const blob = new Blob([fileBuffer]);
  const formData = new FormData();
  formData.append('file', blob, fileName);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('public_id', publicId);

  const res = await fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errText}`);
  }

  const data = await res.json();
  // Insert f_auto,q_auto into the secure_url for optimal CDN delivery
  const optimizedUrl = data.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
  return optimizedUrl;
}

async function main() {
  console.log('--- Starting Cloudinary Asset Migration ---');
  
  const targetDirs = [
    'public/we',
    'public/advisory member',
    'public/blogs',
    'public/Logo',
    'public/mediapartners',
    'public/newcardimages'
  ];

  const individualFiles = [
    'public/hero_bg.jpg',
    'public/ipvs_logo.jpg',
    'public/smart_pump.jpg',
    'public/smart_valve.jpg'
  ];

  let allFiles = [];
  for (const d of targetDirs) {
    allFiles = allFiles.concat(getFiles(d));
  }
  for (const f of individualFiles) {
    if (fs.existsSync(f)) allFiles.push(f);
  }

  // Filter out raw .JPG in public/we (save bandwidth and storage; keep only .webp in public/we)
  const filesToUpload = allFiles.filter(f => {
    const ext = path.extname(f).toLowerCase();
    if (f.startsWith(path.join('public', 'we')) && ext !== '.webp') {
      return false; // Skip the raw 850MB JPGs in public/we
    }
    if (['.jpg', '.jpeg', '.png', '.webp', '.svg', '.jfif'].includes(ext)) {
      return true;
    }
    return false;
  });

  console.log(`Total files to upload: ${filesToUpload.length}`);

  // Load existing map if partially uploaded
  let map = {};
  if (fs.existsSync(MAP_OUTPUT_PATH)) {
    try {
      map = JSON.parse(fs.readFileSync(MAP_OUTPUT_PATH, 'utf-8'));
    } catch (_) {}
  }

  let successCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < filesToUpload.length; i++) {
    const localFile = filesToUpload[i];
    // Key as used in web components, e.g. "/we/finalle (1).webp" or "/Logo/buchiglas.jpg"
    const relFromPublic = '/' + path.relative('public', localFile).replace(/\\/g, '/');

    if (map[relFromPublic]) {
      skippedCount++;
      continue;
    }

    const relKey = path.relative('public', localFile);
    try {
      console.log(`[${i + 1}/${filesToUpload.length}] Uploading ${relFromPublic}...`);
      const cdnUrl = await uploadFile(localFile, relKey);
      map[relFromPublic] = cdnUrl;
      successCount++;
      // Save progressively
      fs.writeFileSync(MAP_OUTPUT_PATH, JSON.stringify(map, null, 2));
    } catch (err) {
      console.error(`Failed to upload ${localFile}:`, err.message);
    }
  }

  fs.writeFileSync(MAP_OUTPUT_PATH, JSON.stringify(map, null, 2));
  console.log(`\nMigration completed! Uploaded: ${successCount}, Already in map: ${skippedCount}, Total mapped: ${Object.keys(map).length}`);
}

main().catch(err => console.error('Fatal error:', err));
