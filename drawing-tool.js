!function(){"use strict";var t="undefined"!=typeof window?window:global;if("function"!=typeof t.require){var e={},i={},s=function(t,e){return{}.hasOwnProperty.call(t,e)},o=function(t,e){var i,s,o=[];i=/^\.\.?(\/|$)/.test(e)?[t,e].join("/").split("/"):e.split("/");for(var r=0,n=i.length;n>r;r++)s=i[r],".."===s?o.pop():"."!==s&&""!==s&&o.push(s);return o.join("/")},r=function(t){return t.split("/").slice(0,-1).join("/")},n=function(e){return function(i){var s=r(e),n=o(s,i);return t.require(n,e)}},a=function(t,e){var s={id:t,exports:{}};return i[t]=s,e(s.exports,n(t),s),s.exports},c=function(t,r){var n=o(t,".");if(null==r&&(r="/"),s(i,n))return i[n].exports;if(s(e,n))return a(n,e[n]);var c=o(n,"./index");if(s(i,c))return i[c].exports;if(s(e,c))return a(c,e[c]);throw new Error('Cannot find module "'+t+'" from "'+r+'"')},h=function(t,i){if("object"==typeof t)for(var o in t)s(t,o)&&(e[o]=t[o]);else e[t]=i},l=function(){var t=[];for(var i in e)s(e,i)&&t.push(i);return t};t.require=c,t.require.define=h,t.require.register=h,t.require.list=l,t.require.brunch=!0}}(),require.register("scripts/drawing-tool",function(t,e,i){function s(t,e){this.options=$.extend(!0,{},a,e),this.tools={},this.ui=new n(this,t,this.options),this._initFabricJS(),this.ui.initTools(),o(this.canvas),r(this.canvas)}var o=(e("scripts/util"),e("scripts/rescale-2-resize")),r=e("scripts/multi-touch-support"),n=e("scripts/ui"),a={width:700,height:500};s.prototype.clear=function(t){this.canvas.clear(),t&&(this.canvas.setBackgroundImage(null),this._backgroundImage=null),this.canvas.renderAll()},s.prototype.clearSelection=function(){this.canvas.deactivateAllWithDispatch(),this.canvas.renderAll()},s.prototype.save=function(){return JSON.stringify({dt:{width:this.canvas.getWidth(),height:this.canvas.getHeight()},canvas:this.canvas.toJSON()})},s.prototype.load=function(t){if(!t)return void this.clear(!0);var e=JSON.parse(t),i=e.dt;this.canvas.setDimensions({width:i.width,height:i.height});var s=e.canvas,o=s.backgroundImage;if(delete s.backgroundImage,this.canvas.loadFromJSON(s),void 0!==o){var r=o.src;delete o.src,this._setBackgroundImage(r,o)}this.canvas.renderAll()},s.prototype.setStrokeColor=function(t){fabric.Object.prototype.stroke=t,this.canvas.freeDrawingBrush.color=t,fabric.Image.prototype.stroke=null},s.prototype.setStrokeWidth=function(t){fabric.Object.prototype.strokeWidth=t,this.canvas.freeDrawingBrush.width=t},s.prototype.setFill=function(t){fabric.Object.prototype.fill=t},s.prototype.setBackgroundImage=function(t,e){var i=this;this._setBackgroundImage(t,null,function(){switch(e){case"resizeBackgroundToCanvas":return void i.resizeBackgroundToCanvas();case"resizeCanvasToBackground":return void i.resizeCanvasToBackground()}})},s.prototype.resizeBackgroundToCanvas=function(){this._backgroundImage&&(this._backgroundImage.set({width:this.canvas.width,height:this.canvas.height}),this.canvas.renderAll())},s.prototype.resizeCanvasToBackground=function(){this._backgroundImage&&(this.canvas.setDimensions({width:this._backgroundImage.width,height:this._backgroundImage.height}),this._backgroundImage.set({top:this.canvas.height/2,left:this.canvas.width/2}),this.canvas.renderAll())},s.prototype.chooseTool=function(t){$("#"+t).click()},s.prototype.changeOutOfTool=function(){this.chooseTool("select")},s.prototype._setBackgroundImage=function(t,e,i){function s(){fabric.util.loadImage(t,o,null,e.crossOrigin)}function o(t){return"anonymous"!==e.crossOrigin&&""!==e.crossOrigin||t?(t=new fabric.Image(t,e),r.canvas.setBackgroundImage(t,r.canvas.renderAll.bind(r.canvas)),r._backgroundImage=t,void("function"==typeof i&&i())):(e=$.extend(!0,{},e),delete e.crossOrigin,console.log("Background could not be loaded due to lack of CORS headers. Trying to load it again without CORS support."),void s())}e=e||{originX:"center",originY:"center",top:this.canvas.height/2,left:this.canvas.width/2,crossOrigin:"anonymous"},s();var r=this},s.prototype._initFabricJS=function(){this.canvas=new fabric.Canvas(this.ui.$canvas[0]),this.canvas.perPixelTargetFind=!fabric.isTouchSupported,this.setStrokeWidth(10),this.setStrokeColor("rgba(100,200,200,.75)"),this.setFill(""),this.canvas.setBackgroundColor("#fff")},i.exports=s}),require.register("scripts/dt-main",function(t,e,i){function s(t){this.drawingTool=new o(t),this.ui=new r(drawingTool,t,options)}var o=e("drawing-tool"),r=e("ui");i.exports=s}),require.register("scripts/inherit",function(t,e,i){i.exports=function(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.super=e.prototype}}),require.register("scripts/multi-touch-support",function(t,e,i){i.exports=function(t){function e(){return t.getActiveObject()||t.getActiveGroup()}function i(t,e){t.set({lockMovementX:e,lockMovementY:e,lockScalingX:e,lockScalingY:e})}if("undefined"!=typeof Hammer&&fabric.isTouchSupported){var s=new Hammer.Manager(t.upperCanvasEl);s.add(new Hammer.Pinch);var o,r;s.on("pinchstart",function(){var t=e();t&&"line"!==t.type&&(i(t,!0),o=t.get("angle"),r=t.get("scaleX"))}),s.on("pinchmove",function(i){var s=e();s&&"line"!==s.type&&(s.set({scaleX:i.scale*r,scaleY:i.scale*r,angle:o+i.rotation}),t.fire("object:scaling",{target:s,e:i.srcEvent}),s.get("scaleX")!==i.scale*r&&(r=1/i.scale))}),s.on("pinchend",function(){var t=e();t&&"line"!==t.type&&i(t,!1)})}}}),require.register("scripts/rescale-2-resize",function(t,e,i){function s(t){t.width=t.width*t.scaleX+t.strokeWidth*(t.scaleX-1),t.height=t.height*t.scaleY+t.strokeWidth*(t.scaleY-1)}function o(t){s(t),1!==t.scaleX?t.height=t.width:t.width=t.height}var r=(e("scripts/tools/line-tool"),{rect:function(t){s(t)},ellipse:function(t){s(t),t.rx=Math.abs(t.width/2),t.ry=Math.abs(t.height/2)},circle:function(t){o(t),t.radius=Math.abs(t.width/2)},square:function(t){o(t)},line:function(t){s(t),t.prevTop=t.top,t.prevLeft=t.left,t.x1>t.x2?(t.x1=t.left+t.width,t.x2=t.left):(t.x2=t.left+t.width,t.x1=t.left),t.y1>t.y2?(t.y1=t.top+t.height,t.y2=t.top):(t.y2=t.top+t.height,t.y1=t.top)},path:function(t){s(t);for(var e=0;e<t.path.length;e++)t.path[e][1]*=t.scaleX,t.path[e][2]*=t.scaleY,t.path[e][3]*=t.scaleX,t.path[e][4]*=t.scaleY}});i.exports=function(t){t.on("object:scaling",function(t){var e=t.target,i=e.dtType||e.type;void 0!==r[i]&&(r[i](e),e.scaleX=1,e.scaleY=1)}),fabric.Group.prototype.lockUniScaling=!0,t.on("before:selection:cleared",function(t){var e=t.target;if("group"===e.type&&1!==e.scaleX)for(var i,s=e.scaleX,o=e.getObjects(),n=0;n<o.length;n++)void 0!==r[o[n].type]&&(i=o[n].strokeWidth,o[n].strokeWidth=0,o[n].scaleX=s,o[n].scaleY=s,r[o[n].type](o[n]),o[n].strokeWidth=i*s,o[n].scaleX=1/s,o[n].scaleY=1/s)})}}),require.register("scripts/tool",function(t,e,i){function s(t,e,i){this.name=t||"Tool",this.selector=e||"",this.master=i,this.canvas=i.canvas,this.active=!1,this.singleUse=!1,this.master.tools[e]=this,this._listeners=[],this._stateListeners=[]}s.prototype.setActive=function(t){return this.singleUse?void console.warn("This is a single use tool. It was not activated."):this.active===t?t:(this.active=t,t===!0?this.activate():this.deactivate(),t)},s.prototype.activate=function(){for(var t=0;t<this._listeners.length;t++){var e=this._listeners[t].trigger,i=this._listeners[t].action;this.canvas.on(e,i)}this._fireStateEvent()},s.prototype.activateAgain=function(){},s.prototype.use=function(){},s.prototype.deactivate=function(){for(var t=0;t<this._listeners.length;t++){{var e=this._listeners[t].trigger;this._listeners[t].action}this.canvas.off(e)}this._fireStateEvent()},s.prototype.addEventListener=function(t,e){this._listeners.push({trigger:t,action:e})},s.prototype.removeEventListener=function(t){for(var e=0;e<this._listeners.length;e++)if(t==this._listeners[e].trigger)return this._listeners.splice(e,1)},s.prototype.addStateListener=function(t){this._stateListeners.push(t)},s.prototype.removeStateListener=function(t){for(var e=0;e<this._stateListeners.length;e++)if(this._stateListeners[e]===t)return this._stateListeners.splice(e,1);return!1},s.prototype._fireStateEvent=function(t,e){var i={source:e||this,active:this.active};for(var s in t)i[s]=t[s];for(var o=0;o<this._stateListeners.length;o++)this._stateListeners[o].call(this.master.ui,i)},i.exports=s}),require.register("scripts/tools/circle-tool",function(t,e,i){function s(t,e,i){r.call(this,t,e,i);var s=this;this.addEventListener("mouse:down",function(t){s.mouseDown(t)}),this.addEventListener("mouse:move",function(t){s.mouseMove(t)}),this.addEventListener("mouse:up",function(t){s.mouseUp(t)})}{var o=e("scripts/inherit"),r=e("scripts/tools/shape-tool");e("scripts/util")}o(s,r),s.prototype.mouseDown=function(t){if(s.super.mouseDown.call(this,t),this.active){var e=this.canvas.getPointer(t.e),i=e.x,o=e.y;this.curr=new fabric.Circle({top:o,left:i,radius:.1,lockUniScaling:!0,selectable:!1}),this.canvas.add(this.curr)}},s.prototype.mouseMove=function(t){if(s.super.mouseMove.call(this,t),this.down!==!1){var e=this.canvas.getPointer(t.e),i=e.x,o=e.y,r=this.curr.left,n=this.curr.top,a=i-r,c=o-n;0>a?(this.curr.originX="right",a=-a):this.curr.originX="left",0>c?(this.curr.originY="bottom",c=-c):this.curr.originY="top";var h=(c>a?a:c)/2;this.curr.set("radius",h),this.curr.set("width",2*h),this.curr.set("height",2*h),this.canvas.renderAll()}},s.prototype.mouseUp=function(t){s.super.mouseUp.call(this,t),this._processNewShape(this.curr),this.canvas.renderAll(),this.actionComplete(this.curr),this.curr=void 0},s.prototype._processNewShape=function(t){"right"===t.originX&&(t.left=t.left-t.width-t.strokeWidth,t.originX="left"),"bottom"===t.originY&&(t.top=t.top-t.height-t.strokeWidth,t.originY="top"),Math.max(t.width,t.height)<this.minSize&&(t.set("radius",this.defSize/2),t.set("width",this.defSize),t.set("height",this.defSize)),this.setCentralOrigin(t),t.setCoords()},i.exports=s}),require.register("scripts/tools/delete-tool",function(t,e,i){function s(t,e,i){r.call(this,t,e,i),this.singleUse=!0;var s=this;$(".dt-canvas-container").keydown(function(t){8===t.keyCode&&(t.preventDefault(),s._delete())})}var o=e("scripts/inherit"),r=e("scripts/tool");o(s,r),s.prototype.use=function(){this._delete()},s.prototype._delete=function(){var t=this.canvas;t.getActiveObject()?t.remove(t.getActiveObject()):t.getActiveGroup()&&(t.getActiveGroup().forEachObject(function(e){t.remove(e)}),t.discardActiveGroup().renderAll())},s.prototype.show=function(){this.$element.show()},s.prototype.hide=function(){this.$element.hide()},i.exports=s}),require.register("scripts/tools/ellipse-tool",function(t,e,i){function s(t,e,i){r.call(this,t,e,i);var s=this;this.addEventListener("mouse:down",function(t){s.mouseDown(t)}),this.addEventListener("mouse:move",function(t){s.mouseMove(t)}),this.addEventListener("mouse:up",function(t){s.mouseUp(t)})}{var o=e("scripts/inherit"),r=e("scripts/tools/shape-tool");e("scripts/util")}o(s,r),s.prototype.mouseDown=function(t){if(s.super.mouseDown.call(this,t),this.active){var e=this.canvas.getPointer(t.e),i=e.x,o=e.y;this.curr=new fabric.Ellipse({top:o,left:i,rx:.1,ry:.1,selectable:!1}),this.canvas.add(this.curr)}},s.prototype.mouseMove=function(t){if(s.super.mouseMove.call(this,t),this.down!==!1){var e=this.canvas.getPointer(t.e),i=e.x,o=e.y,r=this.curr.left,n=this.curr.top,a=i-r,c=o-n;0>a?(this.curr.originX="right",a=-a):this.curr.originX="left",0>c?(this.curr.originY="bottom",c=-c):this.curr.originY="top",this.curr.set("rx",a/2),this.curr.set("ry",c/2),this.curr.set("width",a),this.curr.set("height",c),this.canvas.renderAll()}},s.prototype.mouseUp=function(t){s.super.mouseUp.call(this,t),this._processNewShape(this.curr),this.canvas.renderAll(),this.actionComplete(this.curr),this.curr=void 0},s.prototype._processNewShape=function(t){t.width,t.height;"right"===t.originX&&(t.left=t.left-t.width-t.strokeWidth,t.originX="left"),"bottom"===t.originY&&(t.top=t.top-t.height-t.strokeWidth,t.originY="top"),Math.max(t.width,t.height)<this.minSize&&(t.set("rx",this.defSize/2),t.set("ry",this.defSize/2),t.set("width",this.defSize),t.set("height",this.defSize)),this.setCentralOrigin(t),t.setCoords()},i.exports=s}),require.register("scripts/tools/free-draw",function(t,e,i){function s(t,e,i){r.call(this,t,e,i);var s=this;this.addEventListener("mouse:down",function(t){s.mouseDown(t)}),this.addEventListener("mouse:up",function(t){s.mouseUp(t)})}var o=e("scripts/inherit"),r=e("scripts/tools/shape-tool");o(s,r),s.prototype.mouseDown=function(t){s.super.mouseDown.call(this,t),this.active&&(this.canvas.isDrawingMode||(this.canvas.isDrawingMode=!0,this.canvas._onMouseDownInDrawingMode(t.e)))},s.prototype.mouseUp=function(t){var e=this.canvas.getObjects(),i=e[e.length-1];this.curr=i,s.super.mouseUp.call(this,t),this._locked||(this.canvas.isDrawingMode=!1),this.actionComplete(i),this.curr=void 0},s.prototype.deactivate=function(){s.super.deactivate.call(this),this.canvas.isDrawingMode=!1},i.exports=s}),require.register("scripts/tools/line-tool",function(t,e,i){function s(t,e,i){r.call(this,t,e,i);var o=this;this.addEventListener("mouse:down",function(t){o.mouseDown(t)}),this.addEventListener("mouse:move",function(t){o.mouseMove(t)}),this.addEventListener("mouse:up",function(t){o.mouseUp(t)}),fabric.Line.prototype.is=function(t){return this===t||this.ctp[0]===t||this.ctp[1]===t},this.canvas.on.call(this.canvas,"object:selected",function(t){void 0!==this._selectedObj&&"line"===this._selectedObj.type?this._selectedObj.is(t.target)||(s.objectDeselected.call(this._selectedObj),this._selectedObj=t.target):this._selectedObj=t.target}),this.canvas.on("selection:cleared",function(){this._selectedObj&&"line"===this._selectedObj.type&&s.objectDeselected.call(this._selectedObj),this._selectedObj=void 0})}var o=e("scripts/inherit"),r=e("scripts/tools/shape-tool"),n=e("scripts/tools/select-tool"),a=e("scripts/util"),c="#bcd2ff";o(s,r),s.prototype.mouseDown=function(t){if(s.super.mouseDown.call(this,t),this.active){var e=this.canvas.getPointer(t.e),i=e.x,o=e.y;this.curr=new fabric.Line([i,o,i,o],{selectable:!1,hasControls:!1,hasBorders:!1}),this.canvas.add(this.curr)}},s.prototype.mouseMove=function(t){if(s.super.mouseMove.call(this,t),this.down!==!1){var e=this.canvas.getPointer(t.e),i=e.x,o=e.y;this.curr.set("x2",i),this.curr.set("y2",o),this.canvas.renderAll(!1)}},s.prototype.mouseUp=function(t){s.super.mouseUp.call(this,t),this._processNewShape(this.curr),this.canvas.renderAll(),this.actionComplete(this.curr),this.curr=void 0},s.prototype._processNewShape=function(t){var e=t.get("x1"),i=t.get("y1"),o=t.get("x2"),r=t.get("y2");a.dist(e-o,i-r)<this.minSize&&(o=e+this.defSize,r=i+this.defSize,t.set("x2",o),t.set("y2",r)),t.setCoords(),t.set("prevTop",t.get("top")),t.set("prevLeft",t.get("left")),t.set("selectable",!1);var c=n.BASIC_SELECTION_PROPERTIES.cornerSize;t.ctp=[this._makePoint(e,i,c,t,0),this._makePoint(o,r,c,t,1)],t.on("selected",s.objectSelected),t.on("moving",s.objectMoved),t.on("removed",s.lineDeleted)},s.prototype._makePoint=function(t,e,i,o,r){var n=new fabric.Rect({left:t,top:e,width:i,height:i,strokeWidth:0,stroke:c,fill:c,visible:!1,hasControls:!1,hasBorders:!1,line:o,id:r});return o.canvas.add(n),n.on("moving",s.updateLine),n.on("removed",s.pointDeleted),n},s.objectSelected=function(t){this.prevLeft!==this.left&&this.prevTop!==this.top&&s.objectMoved.call(this,t),s.updateControlPoints.call(this,t),this.ctp[0].visible=!0,this.ctp[1].visible=!0,this.canvas.renderAll(!1)},s.objectDeselected=function(){this.ctp[0].visible=!1,this.ctp[1].visible=!1,this.canvas.renderAll(!1)},s.objectMoved=function(t){var e=this.left-this.prevLeft,i=this.top-this.prevTop;this.set("x1",e+this.x1),this.set("y1",i+this.y1),this.set("x2",e+this.x2),this.set("y2",i+this.y2),this.prevLeft=this.left,this.prevTop=this.top;var o=this;s.updateControlPoints.call(o,t)},s.updateControlPoints=function(){this.ctp[0].set("top",this.y1),this.ctp[0].set("left",this.x1),this.ctp[1].set("top",this.y2),this.ctp[1].set("left",this.x2),this.ctp[0].setCoords(),this.ctp[1].setCoords()},s.updateLine=function(){var t=this.line;t.set("x"+(this.id+1),this.left),t.set("y"+(this.id+1),this.top),t.setCoords(),t.prevLeft=t.left,t.prevTop=t.top,t.canvas.renderAll(!1)},s.pointDeleted=function(){var t=this.line;t.canvas.remove(t.ctp[0]!==this?t.ctp[0]:t.ctp[1]),t.canvas.remove(t)},s.lineDeleted=function(){this.canvas.remove(this.ctp[0])},i.exports=s}),require.register("scripts/tools/rect-tool",function(t,e,i){function s(t,e,i){r.call(this,t,e,i);var s=this;this.addEventListener("mouse:down",function(t){s.mouseDown(t)}),this.addEventListener("mouse:move",function(t){s.mouseMove(t)}),this.addEventListener("mouse:up",function(t){s.mouseUp(t)})}{var o=e("scripts/inherit"),r=e("scripts/tools/shape-tool");e("scripts/util")}o(s,r),s.prototype.mouseDown=function(t){if(s.super.mouseDown.call(this,t),this.active){var e=this.canvas.getPointer(t.e),i=e.x,o=e.y;this.curr=new fabric.Rect({top:o,left:i,width:0,height:0,selectable:!1}),this.canvas.add(this.curr)}},s.prototype.mouseMove=function(t){if(s.super.mouseMove.call(this,t),this.down!==!1){var e=this.canvas.getPointer(t.e),i=e.x,o=e.y,r=this.curr.left,n=this.curr.top;this.curr.set({width:i-r,height:o-n}),this.canvas.renderAll(!1)}},s.prototype.mouseUp=function(t){s.super.mouseUp.call(this,t),this._processNewShape(this.curr),this.canvas.renderAll(),this.actionComplete(this.curr),this.curr=void 0},s.prototype._processNewShape=function(t){t.width<0&&(t.left=t.left+t.width,t.width=-t.width),t.height<0&&(t.top=t.top+t.height,t.height=-t.height),this.setCentralOrigin(t),Math.max(t.width,t.height)<this.minSize&&(t.set("width",this.defSize),t.set("height",this.defSize)),t.setCoords()},i.exports=s}),require.register("scripts/tools/select-tool",function(t,e,i){function s(t,e,i){r.call(this,t,e,i),this.canvas.on("object:selected",function(t){t.target.set(n)})}var o=e("scripts/inherit"),r=e("scripts/tool"),n={cornerSize:fabric.isTouchSupported?22:12,transparentCorners:!1};o(s,r),s.BASIC_SELECTION_PROPERTIES=n,s.prototype.activate=function(){s.super.activate.call(this),this.setSelectable(!0)},s.prototype.deactivate=function(){s.super.deactivate.call(this),this.setSelectable(!1),this.canvas.deactivateAllWithDispatch()},s.prototype.setSelectable=function(t){this.canvas.selection=t;for(var e=this.canvas.getObjects(),i=e.length-1;i>=0;i--)e[i].selectable=t},i.exports=s}),require.register("scripts/tools/shape-tool",function(t,e,i){function s(t,e,i){r.call(this,t,e,i),this.down=!1,this._firstAction=!1,this._locked=!1}{var o=e("scripts/inherit"),r=e("scripts/tool");e("scripts/util")}o(s,r),s.prototype.minSize=7,s.prototype.defSize=30,s.prototype.activate=function(){s.super.activate.call(this),this.down=!1,this._setFirstActionMode(),this.canvas.defaultCursor="crosshair"},s.prototype.activateAgain=function(){this._setFirstActionMode(),this._locked=!0,this._fireStateEvent({state:this.active,locked:!0})},s.prototype.deactivate=function(){s.super.deactivate.call(this),this.unlock()},s.prototype.unlock=function(){this._locked=!1,this._fireStateEvent({state:this.active,locked:!1})},s.prototype.exit=function(){this._locked||(this.down=!1,this.master.changeOutOfTool(this.selector),this.canvas.defaultCursor="default")},s.prototype.mouseDown=function(t){this.down=!0,this._firstAction===!1&&void 0!==t.target&&this.exit()},s.prototype.mouseMove=function(){},s.prototype.mouseUp=function(){this.down=!1},s.prototype.actionComplete=function(t){this._locked||(this._firstAction&&(this._firstAction=!1,this._setAllObjectsSelectable(!0)),t&&(t.selectable=!0))},s.prototype.setCentralOrigin=function(t){t.set({left:t.left+(t.width+t.strokeWidth)/2,top:t.top+(t.height+t.strokeWidth)/2,originX:"center",originY:"center"})},s.prototype._setFirstActionMode=function(){this._firstAction=!0,this._setAllObjectsSelectable(!1)},s.prototype._setAllObjectsSelectable=function(t){for(var e=this.canvas.getObjects(),i=e.length-1;i>=0;i--)e[i].selectable=t},i.exports=s}),require.register("scripts/tools/square-tool",function(t,e,i){function s(t,e,i){r.call(this,t,e,i);var s=this;this.addEventListener("mouse:down",function(t){s.mouseDown(t)}),this.addEventListener("mouse:move",function(t){s.mouseMove(t)}),this.addEventListener("mouse:up",function(t){s.mouseUp(t)})}{var o=e("scripts/inherit"),r=e("scripts/tools/shape-tool");e("scripts/util")}o(s,r),s.prototype.mouseDown=function(t){if(s.super.mouseDown.call(this,t),this.active){var e=this.canvas.getPointer(t.e),i=e.x,o=e.y;this.curr=new fabric.Rect({top:o,left:i,width:0,height:0,selectable:!1,lockUniScaling:!0}),this.canvas.add(this.curr)}},s.prototype.mouseMove=function(t){if(s.super.mouseMove.call(this,t),this.down!==!1){var e=this.canvas.getPointer(t.e),i=e.x-this.curr.left,o=e.y-this.curr.top,r=Math.abs(Math.abs(i)>Math.abs(o)?i:o);this.curr.width=r,0>i&&(this.curr.width*=-1),this.curr.height=r,0>o&&(this.curr.height*=-1),this.canvas.renderAll(!1)}},s.prototype.mouseUp=function(t){s.super.mouseUp.call(this,t),this._processNewShape(this.curr),this.canvas.renderAll(),this.actionComplete(this.curr),this.curr=void 0},s.prototype._processNewShape=function(t){t.width<0&&(t.left=t.left+t.width,t.width=-t.width),t.height<0&&(t.top=t.top+t.height,t.height=-t.height),Math.max(t.width,t.height)<this.minSize&&(t.set("width",this.defSize),t.set("height",this.defSize)),this.setCentralOrigin(t),t.setCoords()},i.exports=s}),require.register("scripts/ui",function(t,e,i){function s(t,e,i){this.master=t,this.options=i,this._initUI(e)}function o(t,e){this.name=t,this.$buttons=e,this.$palette=$('<div class="dt-toolpalette" id="'+this.name+'">').hide();for(var i=0;i<this.$buttons.length;i++)void 0===this.$buttons[i]||this.$buttons[i].appendTo(this.$palette);for(var s=0;s<this.$buttons.length&&"tool"!==this.$buttons[s].data("dt-btn-type");s++);this.currentTool=e[s].attr("id")}var r=(e("scripts/tool"),e("scripts/tools/select-tool")),n=e("scripts/tools/line-tool"),a=e("scripts/tools/rect-tool"),c=e("scripts/tools/ellipse-tool"),h=e("scripts/tools/square-tool"),l=e("scripts/tools/circle-tool"),p=e("scripts/tools/free-draw"),u=e("scripts/tools/delete-tool");s.prototype.initTools=function(t){var e=new r("Selection Tool","select",this.master),i=new n("Line Tool","line",this.master),s=new a("Rectangle Tool","rect",this.master),o=new c("Ellipse Tool","ellipse",this.master),d=new h("Square Tool","square",this.master),v=new l("Circle Tool","circle",this.master),f=new p("Free Draw Tool","free",this.master),g=new u("Delete Tool","trash",this.master),m=t||{shapes:["-select","rect","ellipse","square","circle"],main:["select","line","-shapes","free","trash"]};this._initToolUI(m),this._initButtonUpdates(),this.setLabel(e.selector,"S"),this.setLabel(i.selector,"L"),this.setLabel(s.selector,"R"),this.setLabel(o.selector,"E"),this.setLabel(d.selector,"Sq"),this.setLabel(v.selector,"C"),this.setLabel(f.selector,"F"),this.setLabel(g.selector,"Tr"),this.setLabel("-shapes","Sh"),this.setLabel("-select","S");var w=this.$buttons.trash;w.hide(),this.master.canvas.on("object:selected",function(){w.show()}),this.master.canvas.on("selection:cleared",function(){w.hide()}),this.master.chooseTool("select")},s.prototype.setLabel=function(t,e){if("-"===t.charAt(0)){var i=t.substring(1);this.$tools.find(".dt-link-"+i).find("span").text(e)}else this.$tools.find("#"+t).find("span").text(e)},s.prototype._initButtonUpdates=function(){for(var t in this.master.tools)this.master.tools[t].addStateListener(this.updateUI);var e=this;$(".dt-btn").on("click touchstart",function(t){"palette"===$(this).data("dt-btn-type")?e._paletteButtonClicked($(this).data("dt-link-id")):e._toolButtonClicked("toolLink"===$(this).data("dt-btn-type")?$(this).data("dt-link-id"):$(this).attr("id")),t.preventDefault()})},s.prototype._paletteButtonClicked=function(t){for(var e in this.palettes)e===t?(this.palettes[e].$palette.show(),this.master.chooseTool(this.palettes[e].currentTool)):this.palettes[e].$palette.hide();for(var i=this.palettes[t].$palette.find(".dt-link"),s=0;s<i.length;s++)if("palette"===$(i[s]).data("dt-btn-type")){var o=$(i[s]).data("dt-link-id"),r=this.palettes[o].currentTool;$(i[s]).find("span").text(this.$tools.find("#"+r).find("span").text())}},s.prototype.updateUI=function(t){var e=this.$buttons[t.source.selector];t.active?e.addClass("dt-active"):e.removeClass("dt-active"),t.locked?e.addClass("dt-locked"):e.removeClass("dt-locked")},s.prototype._toolButtonClicked=function(t){console.log(t);var e=this.master.tools[t],i=this.$buttons[e.selector].parent();return i.is(":visible")||this._paletteButtonClicked(i.attr("id")),void 0!==this.master.currentTool&&this.master.currentTool.selector===t?void this.master.currentTool.activateAgain():void 0===e?void console.warn('Warning! Could not find tool with selector "'+t+'"\nExiting tool chooser.'):e.singleUse===!0?void e.use():(void 0!==this.master.currentTool&&this.master.currentTool.setActive(!1),this.master.currentTool=e,e.setActive(!0),this.palettes[i.attr("id")].currentTool=e.selector,void this.master.canvas.renderAll())},s.prototype._initUI=function(t){$(t).empty(),this.$element=$('<div class="dt-container">').appendTo(t),this.$tools=$('<div class="dt-tools">').appendTo(this.$element);var e=$('<div class="dt-canvas-container">').attr("tabindex",0).appendTo(this.$element);this.$canvas=$("<canvas>").attr("width",this.options.width+"px").attr("height",this.options.height+"px").appendTo(e)},s.prototype._initToolUI=function(t){this.$buttons={},this.palettes={};for(var e in t){for(var i=[],s=t[e],r=0;r<s.length;r++){var n;n="-"===s[r].charAt(0)?s[r].substring(1)in t?this._initBtn(s[r],"palette"):this._initBtn(s[r],"toolLink"):this._initBtn(s[r]),i[r]=n,this.$buttons[s[r]]=n}this.palettes[e]=new o(e,i),this.palettes[e].$palette.appendTo(this.$tools)}},s.prototype._initBtn=function(t,e){var i=$('<div class="dt-btn">');return e?"palette"===e?i.data("dt-btn-type","palette").data("dt-link-id",t.substring(1)).addClass("dt-link-"+t.substring(1)).addClass("dt-link"):"toolLink"===e&&i.data("dt-btn-type","toolLink").data("dt-link-id",t.substring(1)).addClass("dt-link-"+t.substring(1)).addClass("dt-link"):i.attr("id",t).data("dt-btn-type","tool"),$("<span>").appendTo(i),i},i.exports=s}),require.register("scripts/util",function(t,e,i){i.exports={dist:function(t,e){var i=Math.pow(t,2),s=Math.pow(e,2);return Math.sqrt(i+s)}}}),window.DrawingTool=require("scripts/drawing-tool");