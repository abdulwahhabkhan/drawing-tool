var inherit   = require('scripts/inherit');
var ShapeTool = require('scripts/shape-tool');
var Util      = require('scripts/util');

function CircleTool(name, selector, drawTool) {
  ShapeTool.call(this, name, selector, drawTool);

  var self = this;
  this.addEventListener("mouse:down", function (e) { self.mouseDown(e); });
  this.addEventListener("mouse:move", function (e) { self.mouseMove(e); });
  this.addEventListener("mouse:up", function (e) { self.mouseUp(e); });
}

inherit(CircleTool, ShapeTool);

CircleTool.prototype.mouseDown = function (e) {
  console.log("Circle down");
  CircleTool.super.mouseDown.call(this, e);

  if (!this.active) { return; }

  var x = e.e.layerX;
  var y = e.e.layerY;

  this.curr = new fabric.Circle({
    top: y,
    left: x,
    radius: 0.1,
    lockUniScaling: true,
    selectable: false
  });
  this.canvas.add(this.curr);
};

CircleTool.prototype.mouseMove = function (e) {
  CircleTool.super.mouseMove.call(this, e);
  if (this.down === false) { return; }
  var x = e.e.layerX,
      y = e.e.layerY,
      x1 = this.curr.left,
      y1 = this.curr.top;

  var width = x - x1;
  var height = y - y1;

  if (width < 0) {
    this.curr.originX = "right";
    width = -width;
  } else {
    this.curr.originX = "left";
  }

  if (height < 0) {
    this.curr.originY = "bottom";
    height = - height;
  } else {
    this.curr.originY = "top";
  }

  // circle size follows the smaller dimension of mouse drag
  var radius = (width < height ? width : height) / 2;

  this.curr.set('radius', radius);

  this.curr.set('width', radius * 2);
  this.curr.set('height', radius * 2);

  this.canvas.renderAll(false);
};

CircleTool.prototype.mouseUp = function (e) {
  console.log("Circle up");

  if (this.curr.radius < 10) {
    // this shape doesn't pass the minimum size threshold and counts as a "click"
    this.canvas.remove(this.curr);
    this.moved = false;
  } else {
    if (this.curr.originX === "right") {
      // "- this.curr.strokeWidth" eliminates the small position shift
      // that would otherwise occur on mouseup
      this.curr.left = this.curr.left - this.curr.width - this.curr.strokeWidth;
      this.curr.originX = "left";
    }
    if (this.curr.originY === "bottom") {
      this.curr.top = this.curr.top - this.curr.height - this.curr.strokeWidth;
      this.curr.originY = "top";
    }
  }

  this.curr.setCoords();
  this.canvas.renderAll(false);
  CircleTool.super.mouseUp.call(this, e);
  this.actionComplete(this.curr);
  this.curr = undefined;
};

module.exports = CircleTool;
