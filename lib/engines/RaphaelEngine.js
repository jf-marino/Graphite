/**
 * Created by jfm on 05/06/15.
 */
(function(module, Class, Utils, Raphael) {

    var RaphaelEngine = Class.extend({
        constructor: function RaphaelEngine() {
            this.canvas = null;
        },

        isEmpty: function() {
            return Utils.exists(this.canvas);
        },

        canvas: function(originX, originY, width, height) {
            if(Utils.are(Number, originX, originY, width, height)) {
                return (this.canvas = Raphael.paper(originX, originY, width, height));
            }
            return null;
        },

        circle: function(originX, originY, radius) {
            if(Utils.are(Number, originX, originY, radius)) {
                return this.canvas.circle(originX, originY, radius);
            }
            return null;
        },

        pathString: function(fromX, fromY, toX, toY) {
            if(Utils.are(Number, fromX, fromY, toX, toY)) {
                var pointA = fromX+","+fromY,
                    pointB = toX+","+toY;
                return "M"+pointA+"L"+pointB;
            }
            return null;
        },

        path: function(fromX, fromY, toX, toY) {
            var path = this.pathString(fromX, fromY, toX, toY);
            if(Utils.exists(path)) {
                return this.canvas.path(path);
            }
            return null;
        },

        remove: function(element) {
            if(Utils.exists(element)) {
                element.remove();
            }
        }
    });

    module.RaphaelEngine = RaphaelEngine;

})(Graphite.engines, Graphite.core.Class, Graphite.core.Utils, Raphael);
