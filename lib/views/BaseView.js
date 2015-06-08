/**
 * Created by jfm on 06/06/15.
 */
(function(module, View, Utils) {

    var BaseView = View.extend({
        constructor: function BaseView(name, model, engine) {
            this._super(name, model, engine);
        },

        render: function() {
            this._super(arguments);
        }
    });

    module.BaseView = BaseView;

})(Graphite.views, Graphite.views.View, Graphite.core.Utils);
