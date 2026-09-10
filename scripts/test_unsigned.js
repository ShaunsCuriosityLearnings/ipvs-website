import fs from 'fs';

async function testUnsigned() {
  const filePath = 'public/ipvs_logo.jpg';
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer]);

  const formData = new FormData();
  formData.append('file', blob, 'ipvs_logo.jpg');
  formData.append('upload_preset', 'ipvswebsite');
  formData.append('public_id', 'ipvs-website/ipvs_logo');

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/lh8mihme/image/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    console.log('RESPONSE:', data);
  } catch (e) {
    console.error('FETCH ERROR:', e);
  }
}

testUnsigned();
