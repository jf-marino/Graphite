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
			_super("Graphite::Vertice");
			this.x = Utils.exists(x) ? x : 0;
			this.y = Utils.exists(y) ? y : 0;
			this.label = Utils.isValidString(label) ? label : "";
		},

		set: function(coord, value) {
			if(Utils.isValidString(coord) && (coord === "x" || coord === "y") && Utils.isValidNumber(value)) {
				this[coord] = value;
				var evt;
				if(coord === "x") evt = Vertice.EVENTS.CHANGE_X;
				if(coord === "y") evt = Vertice.EVENTS.CHANGE_Y;
				this.emit(evt, value);
				this.emit(Vertice.EVENTS.CHANGE_ANY, value);
			}
		},

		setX: function(value) {
			this.set("x", value);
		},

		setY: function(value) {
			this.set("y", value);
		},

		render: function() {
			//	TODO
		}

	});

	module.Vertice = Vertice;

})(Graphite.models, Graphite.core.EventEmitter, Graphite.core.Utils);
