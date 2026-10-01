const https = require('https');

https.get('https://helloproperties-backend.vercel.app/api/properties', (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      const properties = Array.isArray(parsed) ? parsed : (parsed.data || []);
      let missingCoords = [];
      let validCoords = [];
      
      properties.forEach(p => {
        if (!p.latitude && !p.lat && !p.longitude && !p.lng) {
          missingCoords.push({ id: p.id, propertyId: p.propertyId, title: p.title, location: p.location });
        } else {
          validCoords.push({ id: p.id, propertyId: p.propertyId, title: p.title, lat: p.latitude || p.lat, lng: p.longitude || p.lng });
        }
      });
      
      console.log(`Total properties: ${properties.length}`);
      console.log(`\nProperties WITH valid coordinates: ${validCoords.length}`);
      if (validCoords.length > 0) {
        console.log(`Example: ${validCoords[0].title} (Lat: ${validCoords[0].lat}, Lng: ${validCoords[0].lng})`);
      }
      
      console.log(`\nProperties MISSING coordinates: ${missingCoords.length}`);
      missingCoords.slice(0, 10).forEach(p => {
        console.log(`- [${p.propertyId}] ${p.title} (${p.location})`);
      });
      if (missingCoords.length > 10) console.log(`...and ${missingCoords.length - 10} more.`);
      
    } catch (e) {
      console.error('Error parsing JSON', e);
    }
  });
}).on('error', (e) => {
  console.error(e);
});
