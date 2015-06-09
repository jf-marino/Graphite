/**
 * Created by jfm on 05/06/15.
 */
(function(module, Class, Utils, Engines) {

    var RenderEngine = Class.extend({

        static: {
            DEFAULTS: {
                ENGINE: Engines.RaphaelEngine
            }
        },

        constructor: function RenderEngine(engine) {
            var Engine = engine || module.RenderEngine.DEFAULTS.ENGINE;
            this.engine = new Engine();
        },

        isEmpty: function() {
            return this.engine.isEmpty();
        },

        canvas: function(originX, originY, width, height) {
            return this.engine.canvas(originX, originY, width, height);
        },

        circle: function(originX, originY, radius) {
            return this.engine.circle(originX, originY, radius);
        },

        path: function(fromX, fromY, toX, toY) {
            return this.engine.path(fromX, fromY, toX, toY);
        },

        customPath: function(pathString) {
            return this.engine.customPath(pathString);
        },

        linkVertices: function(fromX, fromY, toX, toY, radius) {
            return this.engine.linkVertices(fromX, fromY, toX, toY, radius);
        },

        rectangle: function(x, y, width, height, radius) {
            return this.engine.rectangle(x, y, width, height, radius);
        },

        text: function(x, y, text) {
            return this.engine.text(x, y, text);
        },

        remove: function(element) {
            return this.engine.remove(element);
        }

    });

    module.RenderEngine = RenderEngine;

})(Graphite.engines, Graphite.core.Class, Graphite.core.Utils, Graphite.engines);
