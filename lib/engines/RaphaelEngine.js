/**
 * Created by jfm on 05/06/15.
 */
(function(module, Class, Utils, Raphael) {

    var RaphaelEngine = Class.extend({
        constructor: function RaphaelEngine() {
            this.paper = null;
        },

        isEmpty: function() {
            return !Utils.exists(this.paper);
        },

        canvas: function(originX, originY, width, height) {
            if(Utils.are("number", originX, originY, width, height)) {
                return (this.paper = Raphael(originX, originY, width, height));
            }
            return null;
        },

        canvasInContainer: function(container, width, height) {
            if(Utils.isValidString(container) || Utils.is(HTMLElement, container)) {
                if(Utils.are("number", width, height) || Utils.are("string", width, height)) {
                    return (this.paper = Raphael(container, width, height));
                }
            }
            return null;
        },

        circle: function(originX, originY, radius) {
            if(Utils.are("number", originX, originY, radius)) {
                return this.paper.circle(originX, originY, radius);
            }
            return null;
        },

        drawpath: function( canvas, pathstr, duration, attr, callback )
        {
            var guide_path = canvas.path( pathstr ).attr( { stroke: "none", fill: "none" } );
            var path = canvas.path( guide_path.getSubpath( 0, 1 ) );
            var total_length = guide_path.getTotalLength( guide_path );
            var last_point = guide_path.getPointAtLength( 0 );
            var start_time = new Date().getTime();
            var interval_length = 50;
            var result = path;

            var interval_id = setInterval( function()
            {
                var elapsed_time = new Date().getTime() - start_time;
                var this_length = elapsed_time / duration * total_length;
                var subpathstr = guide_path.getSubpath( 0, this_length );
                attr.path = subpathstr;

                path.animate( attr, interval_length );
                if ( elapsed_time >= duration )
                {
                    clearInterval( interval_id );
                    if ( callback != undefined ) callback();
                    guide_path.remove();
                }
            }, interval_length );
            return result;
        },

        pathString: function(fromX, fromY, toX, toY, ratio) {
            var _ratio = Utils.is("number", ratio) ? ratio : 1.5;
            if(Utils.are("number", fromX, fromY, toX, toY)) {
                var pointA = fromX+","+fromY,
                    pointB = toX+","+toY,
                    xRadius = Math.sqrt( Math.pow(toX-fromX, 2) + Math.pow(toY-fromY, 2)),
                    yRadius = xRadius*_ratio;
                return "M"+pointA+"A"+xRadius+","+yRadius+",0,0,1,"+pointB;
            }
            return null;
        },

        path: function(fromX, fromY, toX, toY, ratio, drawPath, attr, callback) {
            var path = this.pathString(fromX, fromY, toX, toY, ratio);
            if(Utils.exists(path)) {
                if(drawPath) {
                    return this.drawpath(this.paper, path, 1000, attr, callback);
                }
                return this.paper.path(path);
            }
            return null;
        },

        ownPath: function(x, y, radius) {
            var deg2rad = Math.PI/180,
                angle = 85,
                startDx = Math.abs(radius*Math.cos(angle)),
                startDy = Math.abs(radius*Math.sin(angle)),
                endDx = Math.abs(radius*Math.cos(angle)),
                endDy = Math.abs(radius*Math.sin(angle)),
                startPoint = (x+startDx)+","+(y-startDy),
                endPoint = (x+endDx)+","+(y+endDy);
            var path = "M"+startPoint+"A15,15,0,1,1,"+endPoint;
            return this.paper.path(path);
        },

        customPath: function(pathString) {
            if(Utils.isValidString(pathString)) {
                return this.paper.path(pathString);
            }
            return null;
        },

        adjustPointToCircle: function(fromX, fromY, toX, toY, radius) {
            var rad2deg = 180/Math.PI,
                deg2rad = Math.PI/180,
                gradientY = toY - fromY,
                gradientX = toX - fromX,
                gradient = ( gradientY / gradientX ),
                angle = Math.atan(gradient),
                dx = Math.abs(radius*Math.cos(angle)),
                dy = Math.abs(radius*Math.sin(angle)),
                _fromX = (fromX >= toX) ? fromX - dx : fromX + dx,
                _fromY = (fromY >= toY) ? fromY - dy : fromY + dy,
                _toX = (fromX >= toX) ? toX + dx : toX - dx,
                _toY = (fromY >= toY) ? toY + dy : toY - dy;
            return {
                fromX: _fromX,
                fromY: _fromY,
                toX: _toX,
                toY: _toY
            };
        },

        linkVertices: function(fromX, fromY, toX, toY, radius, ratio, drawPath, attr, callback) {
            if(Utils.are("number", fromX, fromY, toX, toY, radius)) {
                var isRecursive = !!(fromX === toX && fromY === toY);

                if(isRecursive) {
                    return this.ownPath(fromX, fromY, radius);
                }

                var newValues = this.adjustPointToCircle(fromX, fromY, toX, toY, radius)
                return this.path(newValues.fromX, newValues.fromY, newValues.toX, newValues.toY, ratio, drawPath, attr, callback);
            }
            return null;
        },

        rectangle: function(x, y, width, height, radius) {
            var _radius = radius || 0;
            if(Utils.are("number", x, y, width, height, radius)) {
                return this.paper.rect(x, y, width, height, radius);
            }
            return null;
        },

        text: function(x, y, text) {
            if(Utils.are("number", x, y) && Utils.isValidString(text)) {
                return this.paper.text(x, y, text);
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
