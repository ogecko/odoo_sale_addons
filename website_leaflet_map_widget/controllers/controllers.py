# -*- coding: utf-8 -*-
from odoo import http
import json

class WebsiteLeafletMapWidget(http.Controller):

    @http.route('/web/geojson/city', auth='public', type='json')
    def geojson(self, **kw):
        properties = ["delivery_id"]
        cities = http.request.env["res.country.state.city"].search(['!',('geometry','=?', '')])
        
        # res = '{"type":"FeatureCollection","features":['
        # firstCity = True
        # for city in cities:
        #     if not firstCity:
        #         res += ','
        #     firstCity = False
        #     res +=  '{'
        #     res += '"id":"' + city.name + '",' 
        #     res += '"type":"Feature",' 
        #     res += '"geometry":' + city.geometry + ',' 
        #     res += '"properties":{'
        #     firstProp = True
        #     for prop in properties:
        #         if not firstProp:
        #             res += ','
        #         firstProp = False
        #         res += '"' + prop + '":"' + city[prop].name + '"' 
        #     res += '}'
        #     res += '}'
        # res += ']}'

        res = { 
            "type": "FeatureCollection",
            "features": [] 
        }
        for city in cities:
            res["features"].append({
                'id': city.name,
                'type': 'Feature',
                'geometry': json.loads(city.geometry),
                'properties': {
                    'delivery_id': city.delivery_id.name
                }
            })
        return res

