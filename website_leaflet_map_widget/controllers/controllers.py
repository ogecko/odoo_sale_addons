# -*- coding: utf-8 -*-
from odoo import http
import json

class WebsiteLeafletMapWidget(http.Controller):

    @http.route('/web/geojson/city', auth='public', type='json')
    def geojson(self, **kw):
        domain = ['!',('geometry','=?', '')]
        if 'delivery_id' in kw:
            domain.insert(0,('delivery_id.name','=', kw['delivery_id']))
            
        cities = http.request.env["res.country.state.city"].search(domain)
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

