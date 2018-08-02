# -*- coding: utf-8 -*-
from odoo import http

# class WebsiteShopOrderInfo(http.Controller):
#     @http.route('/website_shop_order_info/website_shop_order_info/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/website_shop_order_info/website_shop_order_info/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('website_shop_order_info.listing', {
#             'root': '/website_shop_order_info/website_shop_order_info',
#             'objects': http.request.env['website_shop_order_info.website_shop_order_info'].search([]),
#         })

#     @http.route('/website_shop_order_info/website_shop_order_info/objects/<model("website_shop_order_info.website_shop_order_info"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('website_shop_order_info.object', {
#             'object': obj
#         })