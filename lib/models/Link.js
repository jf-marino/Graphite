(function(module, EventEmitter, Utils, Vertice) {

	var Link = EventEmitter.extend({

        static: {
          EVENTS: {
              RENDER: "render:link",
              ADD: "create:link",
              DELETE: "delete:link"
          }
        },

		constructor: function Link(head, tail) {
			this._super("Graphite::Link");
			this.head = head;
			this.tail = tail;
			this.listenTo(this.head, module.Vertice.EVENTS.CHANGE_ANY, Utils.bind(this, this.onHeadMove));
			this.listenTo(this.tail, module.Vertice.EVENTS.CHANGE_ANY, Utils.bind(this, this.onTailMove));
		},

		onHeadMove: function() {
			//	TODO
		},

		onTailMove: function() {
			//	TODO
		},

        remove: function() {
            this.emit(module.Link.EVENTS.DELETE, this);
        }

	});

	module.Link = Link;

})(Graphite.models, Graphite.core.EventEmitter, Graphite.core.Utils, Graphite.models.Vertice);
