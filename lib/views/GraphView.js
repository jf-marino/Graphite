/**
 * Created by jfm on 05/06/15.
 */
(function(module, CompositeView, VerticeView, LinkView, RenderEngine, Utils) {

    var GraphView = CompositeView.extend({
        constructor: function GraphView(graph) {
            var engine = new RenderEngine();
            _super("Graphite::Graph::View", graph, engine);
        },

        addVerticeView: function(vertice) {
            if(Utils.exists(vertice)) {
                var verticeView = new VerticekView(vertice, this.engine);
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
            _super();
            Utils.each(this.components, function(component) {
                this.engine.remove(component);
            }, this);
        },

        render: function() {
            this.engine.canvas();
            _super();
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
