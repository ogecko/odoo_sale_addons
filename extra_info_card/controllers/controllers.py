# -*- coding: utf-8 -*-
from odoo import http

# class ExtraInfoCard(http.Controller):
#     @http.route('/extra_info_card/extra_info_card/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/extra_info_card/extra_info_card/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('extra_info_card.listing', {
#             'root': '/extra_info_card/extra_info_card',
#             'objects': http.request.env['extra_info_card.extra_info_card'].search([]),
#         })

#     @http.route('/extra_info_card/extra_info_card/objects/<model("extra_info_card.extra_info_card"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('extra_info_card.object', {
#             'object': obj
#         })