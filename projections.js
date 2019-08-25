function mercator(longitude, latitude, measure = MEASURES.DEGREES) {
  const RADIANS_PER_DEGREE = Math.PI / 180;

  const LATITUDE_CLAMP = 85.0511287798; // latitude extent to allow distortion to
  // why this weird number? see https://en.wikipedia.org/wiki/Mercator_projection#Truncation_and_aspect_ratio

  const longitudeInRadians = longitude * RADIANS_PER_DEGREE;
  const x = longitudeInRadians * measure;

  const clampedLatitude = Math.max(-LATITUDE_CLAMP, Math.min(LATITUDE_CLAMP, latitude));
  const y = Math.log(Math.tan(((clampedLatitude * RADIANS_PER_DEGREE) / 2) + (Math.PI / 4))) * measure;

  return { x, y };
}

function equiangular(longitude, latitude, measure = MEASURES.DEGREES) {
  return {
    x: longitude * measure,
    y: latitude * measure,
  };
}

// If you want your points back as measured in...
MEASURES = {
  METERS: 6378137,
  DEGREES: (180 / Math.PI),
  RADIANS: 1,
};

module.exports = {
  MEASURES,
  mercator,
  equiangular,
};
