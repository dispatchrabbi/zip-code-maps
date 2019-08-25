const Canvas = require('canvas');
const { makeGeoJsonBoundingBox } = require('./geojson-bounds');
const { mercator } = require('./projections');

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
    boundary.forEach((point, ix) => {
      const pointToDraw = scaleAndTransform(mercator(point[0], point[1]), boundingBox, scale);

      if(ix === 0) {
        context.moveTo(pointToDraw.x, pointToDraw.y);
      } else {
        context.lineTo(pointToDraw.x, pointToDraw.y);
      }
    });
  });

  context.fill();
  // context.stroke();
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
