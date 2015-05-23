(function(module, EventEmitter, Utils, Vertice) {
	
	var Link = EventEmitter.extend({
		
		constructor: function(head, tail) {
			this._super("Graphite::Link");
			this.head = head;
			this.tail = tail;
			this.head.on(Vertice.EVENTS.CHANGE_ANY, Utils.bound(this, this.onHeadMove));
			this.tail.on(Vertice.EVENTS.CHANGE_ANY, Utils.bound(this, this.onTailMove));
		},
		
		onHeadMove: function() {
			//	TODO
		},
		
		onTailMove: function() {
			//	TODO
		}
		
	});
	
	module.Link = Link;
	
})(Graphite.models, Graphite.core.EventEmitter, Graphite.core.Utils, Graphite.models.Vertice);