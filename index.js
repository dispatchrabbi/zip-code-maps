const fs = require('fs');
const Canvas = require('canvas');

const { readJson } = require('./read-json');
const { getUsBounds } = require('./get-us-bounds');
const { drawZipsWithContext } = require('./draw');
const COLORS = ['#f44336', '#f96e32', '#fd902d', '#ffb029', '#ffce2c', '#7aa8a6', '#6c8ec1', '#6574c8', '#6558c3', '#673ab7'];

const largestImageDimension = 960;
const usBox = getUsBounds();
const scale = (usBox.width() > usBox.height()) ? (largestImageDimension / usBox.width()) : (largestImageDimension / usBox.height());

console.log(`Our JSON has a ${usBox.width()} x ${usBox.height()} bounding box`);
console.log(`To scale up to ${largestImageDimension}, that means a scale of ${scale}`);
console.log(`So we are making a canvas of ${usBox.width() * scale} x ${usBox.height() * scale}`);
console.log('');

console.log('Creating canvases for each digit...');
const canvases = [1, 2, 3, 4, 5].map(place => {
  console.log(`  - ${place}...`);
  const canvas = Canvas.createCanvas(usBox.width() * scale, usBox.height() * scale);
  const context = canvas.getContext('2d');

  return {canvas, context};
});
console.log('');

fs.readdirSync('./data').forEach((filename, ix) => {
  if(! filename.endsWith('.json')) { return; }

  const state = filename.slice(0, 2).toUpperCase();

  console.log(`Loading JSON for ${state}...`);
  const stateJson = readJson(`./data/${filename}`);

  canvases.forEach(({canvas, context}, ix) => {
    console.log(`  - Drawing ${state}'s ${ix + 1}th digit on the canvas...`);
    drawZipsWithContext(stateJson, context, usBox, scale, zip => COLORS[+zip[ix]]);
  });

  delete stateJson;

  console.log('');
});

canvases.forEach(({canvas, context}, ix) => {
  console.log(`Writing out map for digit ${ix + 1}...`);
  canvas.createPNGStream().pipe(fs.createWriteStream(`./output/map-zip${ix + 1}.png`));
});
