/**
 * Created by jfm on 06/06/15.
 */
(function(module, View, Utils) {

    var CompositeView = View.extend({
        constructor: function CompositeView(name, model) {
            _super(name, model);
            this._views = {};
        },

        addView: function() {

        },

        removeView: function() {

        }
    });

    module.CompositeView = CompositeView;

})(Graphite.views, Graphite.views.View, Graphite.core.Utils);
