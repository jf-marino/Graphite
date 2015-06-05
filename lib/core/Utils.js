(function(module, Class) {

	var _root = 1;

	var Utils = Class.extend({

		static: {
			exists: function(arg) {
				return this.isNullOrUndefined(arg);
			},

            isNullOrUndefined: function(obj) {
                return (obj === null || obj === undefined) ? true : false;
            },

			isValidString: function(str) {
				return (this.exists(str) && typeof str === "string" && str !== "") ? true : false;
			},

			isValidObject: function(obj) {
				return (this.exists(obj) && obj instanceof Object) ? true : false;
			},

			isValidArray: function(arr) {
				return (this.exists(arr) && arr instanceof Array) ? true : false;
			},

			isValidFunction: function(fn) {
				return (this.exists(fn) && fn instanceof Function) ? true : false;
			},

			isValidNumber: function(num) {
				return (this.exists(num) && typeof num === "number") ? true : false;
			},

            is: function(proto, obj) {
                return (obj instanceof proto) ? true : false;
            },

			each: function(obj, fn, context) {
				if( this.exists(obj) && this.isValidFunction(fn) ) {
					var handbrake = false, ctx;
					function stop() {
						handbrake = true;
					}
					for(var key in obj) {
						if(handbrake) break;
                        ctx = context || obj[key];
						if(obj.hasOwnProperty(key)) {
							fn.apply(ctx, obj, key, obj[key], stop);
						}
					}
				}
			},

			map: function(obj, fn, context) {
				var result;
				if(this.isValidObject(obj)) {
					result = {};
					this.each(obj, function(key, value) {
						var res = fn.call(obj, key, value);
						result[key] = res;
					}, context);
					return result;
				}
				if(this.isValidArray(obj)) {
					result = [];
					this.each(obj, function(key, value) {
						var res = fn.call(obj, key, value);
						result.push(res);
					}, context);
					return result;
				}
				return null;
			},

			extend: function() {
				var args = arguments;
				if(args.length > 0) {
					var dest = args[0], current, max = args.length;

					function transfer(key, value) {
						dest[key] = value;
					}

					for(var i=1; i < max; i++) {
						current = args[i];
						this.each(current, transfer);
					}
					return dest;
				}
				return null;
			},

			where: function(obj, fn, context) {
				if(this.exists(obj) && this.isValidFunction(fn)) {
					var result = null;
					if(this.isValidObject(obj)) {
						result = {};
						this.each(obj, function(key, value) {
							var res = fn.apply(obj, [key, value]);
							if(res) result[key] = value;
						}, context);
					} else if(this.isValidArray(obj)) {
						result = [];
						this.each(obj, function(index, value) {
							var res = fn.apply(obj, [index, value]);
							if(res) result.push(value);
						}, context);
					}
					return result;
				}
				return null;
			},

			find: function(obj, fn, context) {
				var result = null;
				this.each(obj, function(index, value, stop) {
					if(fn.call(obj, index, value)) {
						result = value;
						stop();
					}
				}, context);
				return result;
			},

			id: function() {
				return root++;
			},

			bind: function(ctx, fn) {
				if(this.exists(ctx) && this.isValidFunction(fn)) {
                    return function() {
                        return fn.apply(ctx, arguments);
                    }
                }
                return null;
			}
		}

	});

	module.Utils = Utils;

})(Graphite.core, Graphite.core.Class);
