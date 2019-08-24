const BoundingBox = function(...points) {
  Object.assign(this, {
    xMin: Infinity,
    xMax: -Infinity,
    yMin: Infinity,
    yMax: -Infinity,
  });

  points.forEach(point => this.growToPoint(point));

  return this;
};

BoundingBox.prototype.width = function height() {
  return Math.abs(this.xMax - this.xMin);
};

BoundingBox.prototype.height = function height() {
  return Math.abs(this.yMax - this.yMin);
};

BoundingBox.prototype.growToPoint = function growToPoint(point) {
  this.xMin = Math.min(this.xMin, point.x);
  this.xMax = Math.max(this.xMax, point.x);
  this.yMin = Math.min(this.yMin, point.y);
  this.yMax = Math.max(this.yMax, point.y);

  return this;
};

BoundingBox.prototype.growToBox = function growToBox(box) {
  this.xMin = Math.min(this.xMin, box.xMin);
  this.xMax = Math.max(this.xMax, box.xMax);
  this.yMin = Math.min(this.yMin, box.yMin);
  this.yMax = Math.max(this.yMax, box.yMax);

  return this;
};

module.exports = BoundingBox;
