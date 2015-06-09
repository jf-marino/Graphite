(function(module, EventEmitter, Utils) {


	var Vertice = EventEmitter.extend({

		static: {
			EVENTS: {
				RENDER: "render:vertice",
				DELETE: "delete:vertice",
				CHANGE_X: "update:vertice:x",
				CHANGE_Y: "update:vertice:y",
				CHANGE_ANY: "update:vertice:any"
			}
		},

		constructor: function Vertice(x, y, label) {
			this._super("Graphite::Vertice");
			this.x = Utils.exists(x) ? x : 0;
			this.y = Utils.exists(y) ? y : 0;
			this.label = Utils.isValidString(label) ? label : undefined;
		},

		set: function(coord, value) {
			if(Utils.isValidString(coord) && (coord === "x" || coord === "y") && Utils.isValidNumber(value)) {
				this[coord] = value;
				var evt;
				if(coord === "x") evt = module.Vertice.EVENTS.CHANGE_X;
				if(coord === "y") evt = module.Vertice.EVENTS.CHANGE_Y;
				this.emit(evt, value);
				this.emit(module.Vertice.EVENTS.CHANGE_ANY, {x: this.x, y: this.y});
			}
		},

		setX: function(value) {
			this.set("x", value);
		},

		setY: function(value) {
			this.set("y", value);
		},

        remove: function() {
            this.emit(module.Vertice.EVENTS.DELETE, this);
        }

	});

	module.Vertice = Vertice;

})(Graphite.models, Graphite.core.EventEmitter, Graphite.core.Utils);
