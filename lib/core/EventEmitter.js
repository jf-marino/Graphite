(function(module, BaseObject, Utils) {

	var EventEmitter = BaseObject.extend({

		constructor: function EventEmitter(name) {
			this._super(name);
			this._listeners = {};
            this._listening = {};
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

        listenTo: function(target, evt, fn) {
            var id = undefined;
            if(Utils.exists(target) && Utils.exists(target.id())) {
                id = target.id();
                if(!Utils.isValidArray(this._listening[id])) {
                    this._listening[id] = {
                        target: target,
                        registeredEvents: []
                    };
                }
                target.on(evt, fn);
                this._listening[id]["registeredEvents"].push({
                    evt: evt,
                    callback: fn
                });
            }
        },

		emit: function(evt, data) {
			if(Utils.isValidString(evt)) {
				var target = this._listeners[evt];
				if(Utils.isValidArray(target)) {
					Utils.each(target, function(fn, index) {
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
                        position = this._listeners[evt].indexOf(match);
                        group.splice(position, 1);
                    }
				} else {
					delete this._listeners[evt];
				}
			} else {
				this._listeners = {};
			}
		},

        stopListening: function(target, evt) {
            var _target = null, nodesToDelete = [], _registeredEvents = [];
            if(Utils.exists(target) && Utils.exists(target.id())) {
                _target = this._listening[target.id()][target];
                _registeredEvents = this._listening[target.id()]["registeredEvents"];
                if(Utils.exists(evt)) {
                    //  Unsubscribe to each registered event with the given event name
                    Utils.each(_registeredEvents, function(node, index) {
                        if(node.evt === evt) {
                            _target.off(node.evt, node.callback);
                            nodesToDelete.push(index);
                        }
                    });
                    //  Clean up the _listening array
                    Utils.each(nodesToDelete, function(index) {
                        _registeredEvents.splice(index, 1);
                    });
                } else {
                    Utils.each(_registeredEvents, function(node) {
                        _target.off(node.evt, node.callback);
                    });
                    delete this._listening[target.id()];
                }
            } else {
                Utils.each(this._listening, function(targetNode, targetId) {
                    _target = targetNode.target;
                    _registeredEvents = targetNode.registeredEvents;
                   Utils.each(_registeredEvents, function(evtNode) {
                        _target.off(evtNode.evt, evtNode.callback);
                   });
                    delete targetNode.target;
                    delete targetNode.registeredEvents;
                });
                this._listening = {};
            }
        }

	});

	module.EventEmitter = EventEmitter;

})(Graphite.core, Graphite.core.BaseObject, Graphite.core.Utils);
