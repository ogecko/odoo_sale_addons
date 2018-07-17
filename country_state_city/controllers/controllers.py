# -*- coding: utf-8 -*-
from odoo import http

# class CountryStateCity(http.Controller):
#     @http.route('/country_state_city/country_state_city/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/country_state_city/country_state_city/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('country_state_city.listing', {
#             'root': '/country_state_city/country_state_city',
#             'objects': http.request.env['country_state_city.country_state_city'].search([]),
#         })

#     @http.route('/country_state_city/country_state_city/objects/<model("country_state_city.country_state_city"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('country_state_city.object', {
#             'object': obj
#         })