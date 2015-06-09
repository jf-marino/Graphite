/**
 * Created by jfm on 06/06/15.
 */
(function(module, EventEmitter, Hermes, Utils) {

    var View = EventEmitter.extend({
        constructor: function View(name, model, engine) {
            this._super(name);
            this.engine = engine;
            this.components = {};
            this.model = null;
            if(Utils.exists(model)) {
                this.model = model;
            }
        },

        emit: function(evt, data) {
            // Reroute events through the Action Dispatcher
            Hermes.emit(evt, data);
        },

        remove: function() {
            // Unbind all event callbacks
            this.stopListening();
            if(Utils.exists(this.components)) {
                Utils.each(this.components, function(component) {
                    this.engine.remove(component);
                }, this);
            }
            this.components = {};
        },

        render: function() {
            // TODO subclasses must implement
        }
    });

    module.View = View;

})(Graphite.views, Graphite.core.EventEmitter, Graphite.core.Hermes, Graphite.core.Utils);
