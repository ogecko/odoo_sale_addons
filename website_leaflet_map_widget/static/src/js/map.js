odoo.define('website_leaflet_map_widget.map', function(require) {
    "use strict";
    var Widget = require('web.Widget');
    var core = require('web.core');
    var base = require('web_editor.base');
    var Model = require('web.Model');
    var QWeb = core.qweb;
    var _t = core._t;




    var LeafletMap = Widget.extend({
        //initialize
        init: function (parent, options) {
            console.log('init map');
            this._super(parent);
            this.options = _.defaults(options || {}, {
                'token': 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
                'mapstyle': 'mapbox.light',
                'attribution': '©PSMA Australia Ltd',
            });
            this.token = this.options.token;
            this.mapstyle = this.options.mapstyle;
            this.attribution = this.options.attribution;
            this.geojson = undefined;
        },

        // startup of Widget now DOM is ready
        start: function() {
            console.log('start map');
            var self = this;

            function highlightFeature(e) {
                var layer = e.target;
        
                layer.setStyle({
                    weight: 5,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.7
                });
        
                if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    layer.bringToFront();
                }
            }
        
            function resetHighlight(e) {
                self.geojson.resetStyle(e.target);
            }
        
            function zoomToFeature(e) {
                self.map.fitBounds(e.target.getBounds());
            }
        
            function onEachFeature(feature, layer) {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: zoomToFeature
                });
            }
        
              // get color depending on delivery zone value
            function getColor(d) {
                return d == "Free Delivery" ? '#800026' :
                		d == "Mid Zone Delivery"  ? '#E31A1C' :
                		d == "Outer Zone Delivery"  ? '#FD8D3C' :
                		d == "Out of Delivery Zone"  ? '#FED976' :
                					'blue';
            }
        
            function style(feature) {
                return {
                    weight: 1, opacity: .2, color: 'black',
                    fillOpacity: 0.3,
                    fillColor: getColor(feature.properties.delivery_id)
                };
            }
        
            self._super(self);
            self.$el.css('width','100%');
            self.$el.css('height','100%');
            self.map = L.map(self.$el[0]).setView([-33.804521,151.0051], 11);

            // add the background map tile layer
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={token}', {
                maxZoom: 18, 
                id: self.mapstyle,
                attribution: self.attribution,
                token: self.token,
            }).addTo(self.map);
            
            // add the city polygon layer
            self.rpc('/web/geojson/city',{})            
            .done(function (cityData) {
                self.geojson = L.geoJson(JSON.parse(cityData), {
                    style: style,
                    onEachFeature: onEachFeature,
                }).addTo(self.map);
            });
        
        },

        //Binding Events
        events: {
            'click .js-leaflet-map' : 'method1',
        },

        //creating functions
        method1: function(){
            console.log('method1 map');
            //do something when click event fire on class_ex
        },
    });

    // Initialize all js-leaflet-map elements when ready, creating a LeafletMap Widget
    base.ready().done(function () {
        $('.js-leaflet-map').each(function () {
            const map = new LeafletMap($(this));
            map.appendTo($(this));
            });
        });

    return LeafletMap;
});