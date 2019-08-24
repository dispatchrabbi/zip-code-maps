const BoundingBox = require('./bounding-box');

function makeGeoJsonBoundingBox(geoJson) {
  const bbox = new BoundingBox();

  geoJson.features.forEach(feature => {
    switch(feature.geometry.type) {
      case 'Polygon':
        feature.geometry.coordinates.forEach(
          boundary => boundary.forEach(
            point => {
              bbox.growToPoint({x: point[0], y: point[1]})
            }
          )
        );
        break;
      case 'MultiPolygon':
          feature.geometry.coordinates.forEach(
            polygon => polygon.forEach(
              boundary => boundary.forEach(
                point => bbox.growToPoint({x: point[0], y: point[1]})
              )
            )
          );
        break;
      default:
        throw new Error(`Unsupported GeoJSON geometry type: ${feature.geometry.type}`);
        break;
    }
  });

  return bbox;
}

module.exports = {
  makeGeoJsonBoundingBox
};
