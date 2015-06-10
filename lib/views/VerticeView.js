/**
 * Created by jfm on 05/06/15.
 */
(function(module, CompositeView, Vertice, Utils, Config) {

    var VerticeView = CompositeView.extend({
        constructor: function VerticeView(vertice, engine) {
            this._super("Graphite::Vertice::View", vertice, engine);
            this.initializeEvents();
            this.selected = false;
            this.glow = null;
        },

        initializeEvents: function() {
            var eventMap = Graphite.models.Vertice.EVENTS;
            if(Utils.exists(this.model)) {
                this.listenTo(this.model, eventMap.CHANGE_ANY, Utils.bind(this, this.onCoordinatesChange));
                this.listenTo(this.model, eventMap.DELETE, Utils.bind(this, this.remove));
            }
        },

        createBackgroundPath: function() {
            var radius = Config.styles.vertice.radius,
                angle = 30,
                deg2rad = Math.PI/180,
                dx = Math.abs(radius * Math.cos(angle*deg2rad)),
                dy = Math.abs(radius * Math.sin(angle*deg2rad)),
                pathOriginX = this.model.x - dx,
                pathOriginY = this.model.y - dy,
                path = "M"+pathOriginX+","+pathOriginY;
            var hDistance = 2*dx,
                vDistance = 2*dy;
            path += "L"+(pathOriginX+hDistance)+","+pathOriginY;
            path += "A"+radius+","+radius+",0,0,1,"+(pathOriginX+hDistance)+","+(this.model.y + dy);
            path += "L"+pathOriginX+","+(this.model.y + dy);
            path += "A"+radius+","+radius+",0,0,1,"+pathOriginX+","+pathOriginY+"z";
            return path;
        },

        render: function() {
            var originX = this.model.x || Math.random()*10,
                originY = this.model.y || Math.random()*10,
                radius = Config.styles.vertice.radius,
                label = this.model.label || undefined,
                circle = this.engine.circle(originX, originY, radius),
                backgroundPath = this.createBackgroundPath();
                background = this.engine.customPath(backgroundPath),
                text = this.engine.text(originX, originY, label);
            this.components.circle = circle;
            this.components.label = text;
            this.components.background = background;
            this.applyStyles();
            this.applyHandlers(circle);
        },

        applyStyles: function() {
            var circle = this.components.circle,
                label = this.components.label,
                stroke = Config.styles.vertice.attr.stroke,
                strokeWidth = Config.styles.vertice.attr["stroke-width"],
                fill = Config.styles.vertice.attr.fill,
                fillOpacity = Config.styles.vertice.attr["fill-opacity"],
                textColor = Config.styles.vertice.attr["text-color"],
                textFont = Config.styles.vertice.attr["font"],
                textFontSize = Config.styles.vertice.attr["font-size"];
            circle.attr("stroke", stroke);
            circle.attr("stroke-width", strokeWidth);
            circle.attr("fill", fill);
            circle.attr("fill-opacity", fillOpacity);
            label.attr("fill", textColor);
            label.attr("font", textFont);
            label.attr("font-size", textFontSize);
            this.applyBackgroundStyles();
        },

        applyBackgroundStyles: function() {
            var textBackgroundColor = Config.styles.vertice.attr["text-background-color"],
                background = this.components.background;
            background.attr("fill", textBackgroundColor);
            background.attr("stroke", textBackgroundColor);
        },

        applyHandlers: function(component) {

            //  Click select handler
            component.click(Utils.bind(this, function(evt) {
                if(!this.selected) {
                    this.selected = true;
                    this.glow = component.glow({
                        color: Config.styles.vertice.highlight,
                        opacity: 0.8
                    });
                } else {
                    if(Utils.exists(this.glow)) {
                        this.selected = false;
                        this.glow.remove();
                    }
                }
            }));

            //  Drag handler
            component.drag(Utils.bind(this, function(dx, dy, x, y, evt) {
                var radius = Config.styles.vertice.radius;
                if(Utils.exists(this.glow)) { this.glow.remove(); }
                this.components.circle.attr({
                    cx: x,
                    cy: y
                });
                this.components.label.attr({
                    x: x,
                    y: y
                });
                this.model.set("x", x);
                this.model.set("y", y);
                this.engine.remove(this.components.background);
                this.components.background = this.engine.customPath(this.createBackgroundPath());
                this.applyBackgroundStyles();
                this.components.background.toBack();
                this.components.circle.toBack();
            }));
        },

        onCoordinatesChange: function() {

        }
    });

    module.VerticeView = VerticeView;

})(Graphite.views, Graphite.views.CompositeView, Graphite.models.Vertice, Graphite.core.Utils, Graphite.config);
