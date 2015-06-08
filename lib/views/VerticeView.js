/**
 * Created by jfm on 05/06/15.
 */
(function(module, CompositeView, Vertice, Utils) {

    var VerticeView = CompositeView.extend({
        constructor: function VerticeView(vertice, engine) {
            this._super("Graphite::Vertice::View", vertice, engine);
            this.initializeEvents();
        },

        initializeEvents: function() {
            var eventMap = Graphite.models.Vertice.EVENTS;
            if(Utils.exists(this.model)) {
                this.listenTo(this.model, eventMap.CHANGE_ANY, Utils.bind(this, this.onCoordinatesChange));
                this.listenTo(this.model, eventMap.DELETE, Utils.bind(this, this.remove));
            }
        },

        render: function() {
            var originX = this.model.x || Math.random()*10,
                originY = this.model.y || Math.random()*10,
                circle = this.engine.circle(originX, originY, 20);
            this.components.push(circle);
        },

        onCoordinatesChange: function() {

        }
    });

    module.VerticeView = VerticeView;

})(Graphite.views, Graphite.views.CompositeView, Graphite.models.Vertice, Graphite.core.Utils);
