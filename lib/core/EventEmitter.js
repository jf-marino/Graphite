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
                    var match = Utils.find(group, function(callback) {
                        return callback.toString() === fn.toString();
                    });
                    if(match) {
                        position = this._listeners.indexOf(math);
                        group.splice(position, 1);
                    }
				} else {
					delete this._listeners[evt];
				}
			} else {
				this._listeners = {};
			}
		}

	});

	module.EventEmitter = EventEmitter;

})(Graphite.core, Graphite.core.BaseObject, Graphite.core.Utils);
