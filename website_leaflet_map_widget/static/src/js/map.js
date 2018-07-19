odoo.define('website_leaflet_map_widget.map', function(require) {
    "use strict";
    var Widget = require('web.Widget');
    var core = require('web.core');
    var Model = require('web.Model');

    var QWeb = core.qweb;
    var _t = core._t;

    // here we are getting the value in an array.
    var Map = Widget.extend({
        //render your template
        "template" : "template_name",

        //initialize
        init: function () {
        var self = this;
            this._super(parent);
            //initialize values to variables
        }

        //Binding Events
        events: {
            'click .class_ex' : 'method1',
            'click .class_ex1' : 'method2',
        },

        // initialisation
        start: function() {

            var self = this;
            this._super(parent);
            //your functionality code and logic
        },

        //creating functions
        method1: function(){
            //do something when click event fire on class_ex
        },
        method2: function(){
            //do something when click event fire on class_ex
        },
    });
    return Map;
});