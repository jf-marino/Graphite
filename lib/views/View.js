/**
 * Created by jfm on 06/06/15.
 */
(function(module, EventEmitter, Hermes, Utils) {

    var View = EventEmitter.extend({
        constructor: function View(name, model) {
            _super(name);
            this.model = null;
            if(Utils.is(View, model)) {
                this.model = model;
            }
        },

        emit: function(evt, data) {
            // Reroute events through the Action Dispatcher
            Hermes.emit(evt, data);
        },

        remove: function() {
            // TODO subclasses must implement
        },

        render: function(canvas) {
            // TODO subclasses must implement
        }
    });

    module.View = View;

})(Graphite.views, Graphite.core.EventEmitter, Graphite.core.Hermes, Graphite.core.Utils);
