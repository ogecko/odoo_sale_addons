var setDelivery = undefined;

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
                'attribution': 'Map Data © OpenStreetMap, Boundaries ©PSMA Australia Ltd',
                'keyboard': true,
            });
            this.token = this.options.token;
            this.mapstyle = this.options.mapstyle;
            this.attribution = this.options.attribution;
            this.geojson = undefined;
            this.selectedFeatures = {}; // used to store all selected cities (stores leaflet keyed by city name)
            this.zones = [
                "Free Delivery", 
                "$10 Delivery",
                "$15 Delivery",
                "$20 Delivery",
                "$25 Delivery",
                "$30 Delivery",
                "$40 Delivery",
                "No Deliveries",
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
                const tgtId = e.target.feature.id;
                // if not selected then reset its style (ie leave selected features highlighted)
                if (tgtId && !self.selectedFeatures[tgtId]) 
                   self.geojson.resetStyle(e.target);
                self.info.update();
            }
        
            function toggleSelectedFeature(e) {
                const tgtId = e.target.feature.id;
                // if selected then remove it from the selected list and reset its style
                if (tgtId && self.selectedFeatures[tgtId]) {
                    console.log('Unselecting ', tgtId)
                    const old = self.selectedFeatures[tgtId];
                    delete self.selectedFeatures[tgtId];
                    resetHighlight(old);
                // if not selected then add it to the selected list 
                } else if (tgtId) {
                    self.selectedFeatures[tgtId] = e;
                    console.log('Now Selected', Object.keys(self.selectedFeatures))
                }
            }

            function setDeliveryPrivateFn(id) {
                console.log('Delivery ',id, Object.keys(self.selectedFeatures))
                self.rpc('/web/geojson/set_delivery', { delivery: self.zones[id], cities: Object.keys(self.selectedFeatures) })            
                    .then(res => {
                        console.log('Delivery result ', res);
                        if (res.status) Object.keys(self.selectedFeatures).forEach(city =>{
                            self.selectedFeatures[city].target.feature.properties.delivery_id=self.zones[id];
                            self.selectedFeatures[city].target.setStyle(self.selectedFeatures[city].target.feature);
                            toggleSelectedFeature(self.selectedFeatures[city]);
                        })
                    }, err => {
                        console.log('Delivery set failed',err)
                    });
            }
            
            function zoomToFeature(e) {
                self.map.fitBounds(e.target.getBounds());
            }
        
            function onEachFeature(feature, layer) {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: zoomToFeature,
                    contextmenu: toggleSelectedFeature,
                });
            }
        
              // get color depending on delivery zone value
            function getColor(d) {
                return d == "Free Delivery" ? 'hsla(120,100%,40%,40%)' :  // '#800026' :
                        d == "$10 Delivery"  ? 'hsla(110,85%,30%,50%)' :  //'#E31A1C' :
                        d == "$15 Delivery"  ? 'hsla(100,65%,15%,60%)' :  //'#E31A1C' :
                        d == "$20 Delivery"  ? 'hsla(25,92%,72%,70%)' :  //'#E31A1C' :
                		d == "$25 Delivery"  ? 'hsla(10,85%,64%,60%)' :  //'#FD8D3C' :
                		d == "$30 Delivery"  ? 'hsla(355,65%,45%,60%)' :  //'#FD8D3C' :
                		d == "$40 Delivery"  ? 'hsla(325,100%,15%,70%)' :  //'#FED976' :
                		d == "No Deliveries"  ? 'purple' :  
                					'cyan';
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
                            `<span onclick="setDelivery(${i})"><i style="background:${getColor(self.zones[i])}"></i> ${self.zones[i]}</span>`
                             + (self.zones[i + 1] ? '<br>' : '');
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
            setDelivery = setDeliveryPrivateFn.bind(this);
            self.$el.css('width','100%');
            self.$el.css('height','100%');
            self.map = L.map(self.$el[0]).setView([-33.804521,151.0051], 11);

            // add the background map tile layer
            setTimeout(function(){
                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={token}', {
                    maxZoom: 18, 
                    id: self.mapstyle,
                    attribution: self.attribution,
                    token: self.token,
                }).addTo(self.map);
            },200);
            
            // add the legend and info Window
            addLegend(self);
            addInfoWindow(self);

            // add the city polygon layer
            addCityLayer(self, { delivery_id: self.zones[0]});
            addCityLayer(self, { delivery_id: self.zones[1]});
            addCityLayer(self, { delivery_id: self.zones[2]});
            addCityLayer(self, { delivery_id: self.zones[3]});
            addCityLayer(self, { delivery_id: self.zones[4]});
            addCityLayer(self, { delivery_id: self.zones[5]});
            addCityLayer(self, { delivery_id: self.zones[6]});


        
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