const { readJson } = require('./read-json');
const BoundingBox = require('./bounding-box');
const { makeGeoJsonBoundingBox } = require('./geojson-bounds');

function getUsBounds() {

  console.log('Loading geographic extremities to calculate US bounds...')
  console.log('  - ME...');
  const ME = readJson('./data/me_maine_zip_codes_geo.min.json');
  console.log('  - MN...');
  const MN = readJson('./data/mn_minnesota_zip_codes_geo.min.json');
  console.log('  - FL...');
  const FL = readJson('./data/fl_florida_zip_codes_geo.min.json');
  console.log('  - WA...');
  const WA = readJson('./data/wa_washington_zip_codes_geo.min.json');
  console.log('  - TX...');
  const TX = readJson('./data/tx_texas_zip_codes_geo.min.json');

  const boxes = [
    makeGeoJsonBoundingBox(ME),
    makeGeoJsonBoundingBox(MN),
    makeGeoJsonBoundingBox(FL),
    makeGeoJsonBoundingBox(WA),
    makeGeoJsonBoundingBox(TX),
  ];

  return boxes.reduce((bigBox, box) => bigBox.growToBox(box), new BoundingBox());
}

module.exports = {
  getUsBounds,
};
