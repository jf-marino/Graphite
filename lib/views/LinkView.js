/**
 * Created by jfm on 05/06/15.
 */
(function(module, BaseView, Link, Utils, Config) {

    var LinkView = BaseView.extend({
        constructor: function LinkView(link, engine) {
            this._super("Graphite::Link::View", link, engine);
            this.initializeEvents();
        },

        initializeEvents: function() {
            var eventMap = Graphite.models.Link.EVENTS;
            if(Utils.exists(this.model)) {
                this.listenTo(this.model, eventMap.DELETE, Utils.bind(this, this.remove));
                this.listenTo(this.model, eventMap.HEAD_MOVE, Utils.bind(this, this.onHeadMove));
                this.listenTo(this.model, eventMap.TAIL_MOVE, Utils.bind(this, this.onTailMove));
            }
        },

        render: function() {
            var fromX = this.model.tail.x,
                fromY = this.model.tail.y,
                toX = this.model.head.x,
                toY = this.model.head.y,
                path = this.engine.linkVertices(fromX, fromY, toX, toY, Config.styles.vertice.radius);
            this.applyStyles(path);
            this.components.path = path;
        },

        applyStyles: function(component) {
            var stroke = Config.styles.link.attr.stroke,
                arrowEnd = Config.styles.link.attr["arrow-end"],
                strokeWidth = Config.styles.link.attr["stroke-width"];
            component.attr({
                'stroke': stroke,
                'arrow-end': arrowEnd,
                'stroke-width': strokeWidth
            });
            component.toFront();
        },

        onHeadMove: function(coordinates) {
            this.engine.remove(this.components.path);
            this.components.path = this.engine.linkVertices(
                this.model.tail.x,
                this.model.tail.y,
                coordinates.x,
                coordinates.y,
                Config.styles.vertice.radius
            );
            this.applyStyles(this.components.path);
        },

        onTailMove: function(coordinates) {
            this.engine.remove(this.components.path);
            this.components.path = this.engine.linkVertices(
                coordinates.x,
                coordinates.y,
                this.model.head.x,
                this.model.head.y,
                Config.styles.vertice.radius
            );
            this.applyStyles(this.components.path);
        }
    });

    module.LinkView = LinkView;

})(Graphite.views, Graphite.views.BaseView, Graphite.models.Link, Graphite.core.Utils, Graphite.config);
