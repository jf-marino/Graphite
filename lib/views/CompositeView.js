/**
 * Created by jfm on 06/06/15.
 */
(function(module, View, Utils) {

    var CompositeView = View.extend({
        constructor: function CompositeView(name, model, engine) {
            _super(name, model, engine);
            this._views = {};
        },

        addView: function(view) {
            if(Utils.is(View, view)) {
                this._views[view.id()] = view;
                view.render();
            }
        },

        removeView: function(view) {
            if(Utils.is(View, view)) {
                delete this._views[view.id()];
                view.remove();
            }
        },

        remove: function() {
            Utils.each(this._views, function(view) {
               view.remove();
            });
            _super();
        },

        render: function() {
            _super();
            Utils.each(this._views, function(view) {
                view.render();
            });
        }
    });

    module.CompositeView = CompositeView;

})(Graphite.views, Graphite.views.View, Graphite.core.Utils);
