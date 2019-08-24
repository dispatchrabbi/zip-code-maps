const Canvas = require('canvas');
const { makeGeoJsonBoundingBox } = require('./geojson-bounds');

function drawZipsWithContext(geoJson, context, boundingBox, scale, zipToColor) {

  geoJson.features.forEach(feature => {
    const zip = feature.properties.ZCTA5CE10;
    const zipColor = zipToColor(zip);
    // console.log(`Drawing ${feature.properties.ZCTA5CE10} using ${zipColor}...`);
    context.fillStyle = zipColor;
    //context.strokeStyle = '#333';

    switch(feature.geometry.type) {
      case 'Polygon':
        drawPolygon(feature.geometry.coordinates, context, boundingBox, scale);
        break;
      case 'MultiPolygon':
        feature.geometry.coordinates.forEach(polygon => drawPolygon(polygon, context, boundingBox, scale));
        break;
      default:
        throw new Error(`Unsupported GeoJSON geometry type: ${feature.geometry.type}`);
        break;
    }
  });
}

function drawPolygon(polygon, context, boundingBox, scale) {
  context.beginPath();
  polygon.forEach(boundary => {
    boundary.forEach(([long, lat], ix) => {
      const point = scaleAndTransform({x: long, y: lat}, boundingBox, scale);

      if(ix === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }
    });
  });

  context.fill();
  // context.stroke();
}

// Stolen from http://mikefowler.me/journal/2014/06/10/drawing-geojson-in-a-canvas
// unlike the rest of this, which is merely adapted
function mercator(longitude, latitude) {
  var radius = 6378137;
  var max = 85.0511287798;
  var radians = Math.PI / 180;
  var point = {};

  point.x = radius * longitude * radians;
  point.y = Math.max(Math.min(max, latitude), -max) * radians;
  point.y = radius * Math.log(Math.tan((Math.PI / 4) + (point.y / 2)));

  return point;
}

function scaleAndTransform(point, boundingBox, scale) {
  return {
    x: (point.x - boundingBox.xMin) * scale,
    y: (boundingBox.yMax - point.y) * scale,
  };
}

module.exports = {
  drawZipsWithContext,
};
