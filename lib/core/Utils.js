(function(module, Class) {
	
	var _root = 1;
	
	var Utils = Class.extend({
		
		static: {
			exists: function(arg) {
				return (typeof arg !== "undefined" && arg !== null) ? true : false;
			},
			
			isValidString: function(str) {
				return (this.exists(str) && typeof str === "string" && str !== "") ? true : false;
			},
			
			isValidObject: function(obj) {
				return (this.exists(obj) && typeof obj === "object") ? true : false;
			},
			
			isValidArray: function(arr) {
				return (this.exists(arr) && arr instanceof Array) ? true : false;
			},
			
			isValidFunction: function(fn) {
				return (this.exists(fn) && typeof fn === "function") ? true : false;	
			},
			
			isValidNumber: function(num) {
				return (this.exists(num) && typeof num === "number") ? true : false;
			},
			
			each: function(obj, fn) {
				if( this.exists(obj) && this.isValidFunction(fn) ) {
					var handbrake = false;
					function stop() {
						handbrake = true;
					}
					for(var key in obj) {
						if(handbrake) break;
						if(obj.hasOwnProperty(key)) {
							fn.call(obj, key, obj[key], stop);
						}
					}
				}
			},
			
			map: function(obj, fn) {
				var result;
				if(this.isValidObject(obj)) {
					result = {};
					this.each(obj, function(key, value) {
						var res = fn.call(obj, key, value);
						result[key] = res;
					});
					return result;
				}
				if(this.isValidArray(obj)) {
					result = [];
					this.each(obj, function(key, value) {
						var res = fn.call(obj, key, value);
						result.push(res);
					});
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
			
			where: function(obj, fn) {
				if(this.exists(obj) && this.isValidFunction(fn)) {
					var result = null;
					if(this.isValidObject(obj)) {
						result = {};
						this.each(obj, function(key, value) {
							var res = fn.apply(obj, [key, value]);
							if(res) result[key] = value;
						});
					} else if(this.isValidArray(obj)) {
						result = [];
						this.each(obj, function(index, value) {
							var res = fn.apply(obj, [index, value]);
							if(res) result.push(value);
						});
					}
					return result;
				}
				return null;
			},
			
			find: function(obj, fn) {
				var result = null;
				this.each(obj, function(index, value, stop) {
					if(fn.call(obj, index, value)) {
						result = value;
						stop();
					}
				});
				return result;
			},
			
			id: function() {
				return root++;
			},
			
			bound: function(ctx, fn) {
				if(this.exists(ctx) && this.isValidFunction(fn)) {
					return fn.bind(ctx);
				}
				return null;
			}
		}
		
	});
	
	module.Utils = Utils;
	
})(Graphite.core, Graphite.core.Class);
