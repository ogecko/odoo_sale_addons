# -*- coding: utf-8 -*-
from odoo import http
import json

class WebsiteLeafletMapWidget(http.Controller):

    @http.route('/web/geojson/city', auth='public', type='json')
    def geojson(self, **kw):
        domain = ['!',('geometry','=?', '')]
        if 'delivery_id' in kw:
            domain.insert(0,('delivery_id.name','=', kw['delivery_id']))

        cities = http.request.env["res.country.state.city"].sudo().search(domain)
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

    @http.route('/web/geojson/set_delivery', auth='user', type='json')
    def set_delivery(self, **kw):
        
        if http.request.session.login in ['jdmorriso@gmail.com', 'contactus@theposyplace.com.au']:
            delivery = http.request.env['delivery.carrier'].search([('name','=',kw['delivery'])])
            cities = http.request.env["res.country.state.city"].search([('name','in', kw['cities'])])
            if len(delivery) == 1:
                cities.write({ 'delivery_id': delivery.id })
                return { 'status': True }

        return { 'status': False }
