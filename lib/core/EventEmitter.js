(function(module, BaseObject, Utils) {

	var EventEmitter = BaseObject.extend({

		constructor: function EventEmitter(name) {
			_super(name);
			this._listeners = {};
		},

		on: function(evt, fn) {
			if(Utils.isValidString(evt) && Utils.isValidFunction(fn)) {
				var target = this._listeners[evt];
				if(!Utils.exists(target)) {
					this._listeners[evt] = [];
					target = this._listeners[evt];
				}
				target.push(fn);
			}
		},

		emit: function(evt, data) {
			if(Utils.isValidString(evt)) {
				var target = this._listeners[evt];
				if(Utils.isValidArray(target)) {
					Utils.each(target, function(index, fn) {
						fn.call(this, data);
					});
				}
			}
		},

		off: function(evt, fn) {
			if(Utils.isValidString(evt) && Utils.isValidArray(this._listeners[evt])) {
				var group = this._listeners[evt];
				if(Utils.isValidFunction(fn)) {
					var position;
					Utils.each(group, function(index, callback) {
						var isMatch = fn.toString() === callback.toString();
						if(isMatch) position = index;
					});
					group.splice(position, 1);
				} else {
					this._listeners[evt] = null;
				}
			} else {
				this._listeners = {};
			}
		}

	});

	module.EventEmitter = EventEmitter;

})(Graphite.core, Graphite.core.BaseObject, Graphite.core.Utils);
