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
            this._super("Graphite::Graph");
            this._vertices = {};
            this._links = {};
            this.rootView = null;
        },

        addVertice: function(vertice) {
            if(Utils.exists(vertice) && Utils.is(Vertice, vertice)) {
                this._vertices[vertice.id()] = vertice;
                this.emit(module.Graph.EVENTS.ADD_VERTICE, vertice);
                if(Utils.exists(this.rootView)) {
                    this.rootView.addVerticeView(vertice);
                }
            }
        },

        removeVertice: function(vertice) {
            if(Utils.exists(vertice) && Utils.is(Vertice, vertice)) {
                var isAlreadyAdded = !!(this._vertices[vertice.id()]);
                if(isAlreadyAdded) {
                    vertice.remove();
                    delete this._vertices[vertice.id()];
                    this.emit(module.Graph.EVENTS.REMOVE_VERTICE, vertice);
                }
            }
        },

        addLink: function(link) {
            if(Utils.exists(link) && Utils.is(Link, link)) {
                this._links[link.id()] = link;
                this.emit(module.Graph.EVENTS.ADD_LINK, link);
                if(Utils.exists(this.rootView)) {
                    this.rootView.addLinkView(link);
                }
            }
        },

        removeLink: function(link) {
            if(Utils.exists(link) && Utils.is(Link, link)) {
                var isAlreadyAdded = !!(this._links[link.id()]);
                if(isAlreadyAdded) {
                    link.remove();
                    delete this._links[link.id()];
                    this.emit(module.Graph.EVENTS.REMOVE_LINK, link);
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
        },

        show: function() {
            this.rootView = new Graphite.views.GraphView(this);
            this.rootView.render();
        }
    });

    module.Graph = Graph;

})(Graphite.models, Graphite.core.EventEmitter, Graphite.core.Utils, Graphite.models.Vertice, Graphite.models.Link);
