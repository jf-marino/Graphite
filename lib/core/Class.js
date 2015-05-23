/* global Graphite */
(function(namespace) {
	
	
	function hasProp(prop, obj) {
		return obj[prop] !== undefined ? true : false;
	}
	
	function isValid(type, obj) {
		switch(type) {
			case "string": 
				return (typeof obj === "string" && obj !== "") ? true : false;
			case "object": 
				return typeof obj === "object" ? true : false;
			case "number": 
				return typeof obj === "number" ? true : false;
			case "function":
				return typeof obj === "function" ? true : false;
			case "boolean":
				return typeof obj === "boolean" ? true : false;
			default:
				return false;
		}
		return false;
	}
	
	function map(obj, fn) {
		if(isValid("object", obj)) {
			for(var prop in obj) {
				if(obj.hasOwnProperty(prop)) {
					fn(prop, obj[prop]);	
				}
			}
		}
	}
	
	namespace.Class = function() {};
	
	namespace.Class.extend = function(definition) {
		// Create the initial empty constructor
		var _constructor = function() {};
		var __super = this.prototype;
		
		// Check for a definition object
		if(isValid("object", definition)) {
			// If there is a constructor declared within the definition, then use that one
			if(hasProp("constructor", definition)) {
				var defConstructor = definition.constructor;
				_constructor = function() {
					var oldSuper = this._super, retValue;
					this._super = __super.constructor;
					retValue = defConstructor.apply(this, arguments);
					this._super = oldSuper;
					return retValue;
				};
			}
			
			// First add all class properties
			if(hasProp("static", definition)) {
				map(definition.static, function(prop, value) {
					_constructor[prop] = value;
				});
			}
			
			// Then inherit this into the constructor function
			//  ->	First a dummy function is declared which holds the super class in its prototype
			//		this will allow us to pass the prototype by instancing the dummy
			var Dummy = function() {};
			Dummy.prototype = this.prototype;
			
			//	->	Then we inherit using the dummy
			_constructor.prototype = new Dummy();
			_constructor.prototype.constructor = _constructor;
			
			
			//	->	Finally we add all methods and properties from the definition
			//	->	If a function then allow it to call super()
			_constructor.prototype._super = __super;
			map(definition, function(name, value) {
				// Unless the property is the constructor or the static properties definition...
				if(name !== "constructor" && name !== "static") {
					// If the property is a function
					if(isValid("function", value)) {
						// And the parent has a function with the same name
						if(isValid("function", __super[name])) {
							// Give the function super() powers
							var fn = value;
							_constructor.prototype[name] = function() {
								var oldSuper = this._super, retValue;
								this._super = __super[name];
								retValue = fn.apply(this, arguments);
								this._super = oldSuper;
								return retValue;
							};
						} else {
							// If not then just add the function to the prototype
							_constructor.prototype[name] = value;
						}
						
					} else {
						_constructor.prototype[name] = value;
					}
				}
			});
						
		}
		
		// Give the constructor the ability to extend itself
		_constructor.extend = this.extend;
		// Return the constructor function
		return _constructor;
	};


})(Graphite.core);
/**
 *	Add your prefered namespace as the argument passed to this function instead of {}.
 *	That namespace will get a property called "Class" which can be extended
 *	like this:
 *	
 *		var myClass = <your_namespace>.Class.extend({
 *			
 *			constructor: function() {...},
 *			
 *			static: {
 *				aStaticProperty: ... ,
 *				aStaticMethod: function() {...}
 *			},
 *			
 *			methodOne: function() {...},
 *			
 *			methodTwo: function() {...},
 *			
 *			and so on...
 *		});
 *
 *	Also any subclass of <your_namespace>.Class is extendable,
 *	no matter how deep the subclass tree, i.e.
 *
 *		var anotherClass = myClass.extend({...});
 *
 *		var aThirdClass = anotherClass.extend({...});
 *
 *	You can create infinite levels of inheritance.
 *	All "base" classes will inherit from <your_namespace>.Class, the rest can
 *	inherit from any "base" classes or any of their subclasses.
 */
 
 