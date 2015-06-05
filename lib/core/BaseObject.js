(function(module, Class, Utils) {

	var BaseObject = Graphite.core.Class.extend({
		constructor: function BaseObject(name) {
			this.__gid__ = Utils.id();
			if(Utils.exists(name)) {
				this.__name__ = name;
			}
		},
		id: function() {
			return this.__gid__;
		}
	});

	module.BaseObject = BaseObject;

})(Graphite.core, Graphite.core.Class, Graphite.core.Utils);
