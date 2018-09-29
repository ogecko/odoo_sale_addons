# -*- coding: utf-8 -*-

from odoo import models, fields, api

# class country_state_city(models.Model):
#     _name = 'country_state_city.country_state_city'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         self.value2 = float(self.value) / 100

class CountryStateCity(models.Model):
    _description = "Country State City"
    _name = 'res.country.state.city'
    _translate = False

    name = fields.Char(string='City Name', required=True, help='City, Suburb, or Town name.')
    region = fields.Char(string='Region', help='The region or area that the city is within.', required=True)
    metro = fields.Char(string='Metropolitan Area', help='The wider metro area or capital city name.', required=True)
    postcode = fields.Char(string='Post Code', help='The postal code for the city.', required=True)
    state_id = fields.Many2one('res.country.state', string='State', required=True)
    delivery_id = fields.Many2one('delivery.carrier', string='Delivery', required=True)
    geometry = fields.Text(string='GeoJSON Geometry', help='The geometry of the City area as a GEOJSON Geometry Object.')

