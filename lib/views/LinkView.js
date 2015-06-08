/**
 * Created by jfm on 05/06/15.
 */
(function(module, BaseView, Link, Utils) {

    var LinkView = BaseView.extend({
        constructor: function LinkView(link, engine) {
            _super("Graphite::Link::View", link, engine);
        },

        render: function() {
            var fromX = this.model.tail.x,
                fromY = this.model.tail.y,
                toX = this.model.head.x,
                toY = this.model.head.y,
                path = this.engine.path(fromX, fromY, toX, toY);
            this.components.push(path);
        }
    });

    module.VerticeView = LinkView;

})(Graphite.views, Graphite.views.BaseView, Graphite.models.Link, Graphite.core.Utils);
