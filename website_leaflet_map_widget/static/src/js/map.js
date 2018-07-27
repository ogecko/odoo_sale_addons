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
            this.zones = [
                "Free Delivery", 
                "Mid Zone Delivery",
                "Outer Zone Delivery",
                "Out of Delivery Zone",
            ];
        },

        // startup of Widget now DOM is ready
        start: function() {
            console.log('start map');
            var self = this;

            function highlightFeature(e) {
                var layer = e.target;
        
                self.info.update(layer.feature);

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
                self.info.update();
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
                return d == "Free Delivery" ? 'hsla(120,100%,40%,40%)' :  // '#800026' :
                		d == "Mid Zone Delivery"  ? 'hsla(25,92%,72%,70%)' :  //'#E31A1C' :
                		d == "Outer Zone Delivery"  ? 'hsla(0,75%,64%,70%)' :  //'#FD8D3C' :
                		d == "Out of Delivery Zone"  ? 'hsla(340,100%,25%,56%)' :  //'#FED976' :
                					'blue';
            }
        
            function style(feature) {
                return {
                    weight: 1, opacity: .2, color: 'black',
                    fillOpacity: 0.3,
                    fillColor: getColor(feature.properties.delivery_id)
                };
            }
            
            function addInfoWindow(self) {
                self.info = L.control();
                self.info.onAdd = function (map) {
                    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
                    this.update();
                    return this._div;
                };
                // method that we will use to update the control based on feature properties passed
                self.info.update = function (feature) {
                    this._div.innerHTML = '<h4>Delivery Suburbs</h4>' +  (feature?
                        '<b>' + feature.id + '</b><br />' + feature.properties.delivery_id 
                        : 'Hover over a suburb');
                };
                self.info.addTo(self.map);
            }

            function addLegend(self) {
                self.legend = L.control({position: 'bottomright'});
                self.legend.onAdd = function (map) {
                    var div = L.DomUtil.create('div', 'info legend');

                    // loop through our zones, inserting an icon and label
                    for (var i = 0; i < self.zones.length; i++) {
                        div.innerHTML +=
                            '<i style="background:' + getColor(self.zones[i]) + '"></i> ' +
                            self.zones[i] + (self.zones[i + 1] ? '<br>' : '');
                    }
                    return div;
                };
                
                self.legend.addTo(self.map);
            }

            function addCityLayer(self, domain) {
                self.rpc('/web/geojson/city', domain)            
                .done(function (cityData) {
                    self.geojson = L.geoJson(cityData, {
                        style: style,
                        onEachFeature: onEachFeature,
                    }).addTo(self.map);
                });
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
            
            // add the legend and info Window
            addLegend(self);
            addInfoWindow(self);

            // add the city polygon layer
            addCityLayer(self, { delivery_id: 'Free Delivery'});
            addCityLayer(self, { delivery_id: 'Mid Zone Delivery'});
            addCityLayer(self, { delivery_id: 'Outer Zone Delivery'});
            addCityLayer(self, { delivery_id: 'Out of Delivery Zone'});
        
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