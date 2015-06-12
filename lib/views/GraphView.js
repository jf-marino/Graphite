/**
 * Created by jfm on 05/06/15.
 */
(function(module, CompositeView, VerticeView, LinkView, RenderEngine, Utils) {

    var GraphView = CompositeView.extend({

        static: {
            DEFAULTS: {
                CANVAS: {
                    X: 0,
                    Y: 0,
                    WIDTH: 500,
                    HEIGHT: 500
                }
            }
        },

        constructor: function GraphView(graph, container) {
            this._super("Graphite::Graph::View", graph, new RenderEngine());
            this.container = (Utils.isValidString(container) || Utils.is(HTMLElement, container)) ? container : null;
            graph.forEach("vertice", function(vertice) {
                this.addVerticeView(vertice);
            }, this);
            graph.forEach("link", function(link) {
                this.addLinkView(link);
            }, this);
        },

        addVerticeView: function(vertice) {
            if(Utils.exists(vertice)) {
                var verticeView = new VerticeView(vertice, this.engine);
                this.addView(verticeView);
                if(!this.engine.isEmpty()) {
                    verticeView.render();
                }
            }
        },

        addLinkView: function(link) {
            if(Utils.exists(link)) {
                var linkView = new LinkView(link, this.engine);
                this.addView(linkView);
                if(!this.engine.isEmpty()) {
                    linkView.render();
                }
            }
        },

        remove: function() {
            this._super();
            Utils.each(this.components, function(component) {
                this.engine.remove(component);
            }, this);
        },

        render: function() {
            var defaults = module.GraphView.DEFAULTS.CANVAS;
            if(Utils.exists(this.container)) {
                this.engine.canvasInContainer(this.container, '100%', '100%');
            } else {
                this.engine.canvas(defaults.X, defaults.Y, defaults.WIDTH, defaults.HEIGHT);
            }
            this._super();
        }
    });

    module.GraphView = GraphView;

})(
    Graphite.views,
    Graphite.views.CompositeView,
    Graphite.views.VerticeView,
    Graphite.views.LinkView,
    Graphite.engines.RenderEngine,
    Graphite.core.Utils
);
