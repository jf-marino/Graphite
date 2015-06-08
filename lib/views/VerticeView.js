/**
 * Created by jfm on 05/06/15.
 */
(function(module, CompositeView, Vertice, Utils) {

    var VerticeView = CompositeView.extend({
        constructor: function VerticeView(vertice, engine) {
            _super("Graphite::Vertice::View", vertice, engine);
            this.listenTo(this.model, Vertice.EVENTS.CHANGE_ANY, Utils.bind(this, this.onCoordinatesChange));
        },

        render: function() {
            var originX = Math.random()*10,
                originY = Math.random()*10,
                circle = this.engine.circle(originX, originY, 20);
            this.components.push(circle);
        },

        onCoordinatesChange: function() {

        }
    });

    module.VerticeView = VerticeView;

})(Graphite.views, Graphite.views.CompositeView, Graphite.models.Vertice, Graphite.core.Utils);
