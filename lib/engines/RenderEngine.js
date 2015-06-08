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
            var eng = engine || RenderEngine.DEFAULTS.ENGINE;
            this.engine = eng;
        },

        canvas: function(originX, originY, width, height) {
            return this.engine.canvas(originX, originY, width, height);
        },

        circle: function(originX, originY, radius) {
            return this.engine.circle(originX, originY, radius);
        },

        path: function(fromX, fromY, toX, toY) {
            return this.engine.path(fromX, fromY, toX, toY);
        }

    });

    module.RenderEngine = RenderEngine;

})(Graphite.engines, Graphite.core.Class, Graphite.core.Utils, Graphite.engines);
