/**
 * Created by jfm on 05/06/15.
 */
(function(module, EventEmitter, Utils, Vertice, Link) {

    var Graph = EventEmitter.extend({

        static: {
            EVENTS: {
                RENDER: "",
                ADD_VERTICE: "",
                REMOVE_VERTICE: "",
                ADD_LINK: "",
                REMOVE_LINK: "",
            }
        },

        constructor: function Graph() {
            _super("Graphite::Graph");
            this._vertices = {};
            this._links = {};
        },

        addVertice: function(vertice) {
            if(Utils.exists(vertice) && Utils.is(Vertice, vertice)) {
                this._vertices[vertice.id()] = vertice;
                this.emit(Graph.EVENTS.ADD_VERTICE, vertice);
            }
        },

        removeVertice: function(vertice) {
            if(Utils.exists(vertice) && Utils.is(Vertice, vertice)) {
                var isAlreadyAdded = !!(this._vertices[vertice.id()]);
                if(isAlreadyAdded) {
                    delete this._vertices[vertice.id()];
                    this.emit(Graph.EVENTS.REMOVE_VERTICE, vertice);
                }
            }
        },

        addLink: function(link) {
            if(Utils.exists(link) && Utils.is(Link, link)) {
                this._links[link.id()] = link;
                this.emit(Graph.EVENTS.ADD_LINK, link);
            }
        },

        removeLink: function(link) {
            if(Utils.exists(link) && Utils.is(Link, link)) {
                var isAlreadyAdded = !!(this._links[link.id()]);
                if(isAlreadyAdded) {
                    delete this._links[link.id()];
                    this.emit(Graph.EVENTS.REMOVE_LINK, link);
                }
            }
        },

        forEach: function(type, fn, context) {
            var ctx;
            if(Utils.isValidString(type) && Utils.isValidFunction(fn)) {
                if(type === "vertice") {
                    Utils.each(this._vertices, fn, context);
                }
                if(type === "link") {
                    Utils.each(this._links, fn, context);
                }
            }
        }
    });

    module.Graph = Graph;

})(Graphite.models, Graphite.core.EventEmitter, Graphite.core.Utils, Graphite.models.Vertice, Graphite.models.Link);