# -*- coding: utf-8 -*-
from odoo import http

# class WebVue(http.Controller):
#     @http.route('/web_vue/web_vue/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/web_vue/web_vue/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('web_vue.listing', {
#             'root': '/web_vue/web_vue',
#             'objects': http.request.env['web_vue.web_vue'].search([]),
#         })

#     @http.route('/web_vue/web_vue/objects/<model("web_vue.web_vue"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('web_vue.object', {
#             'object': obj
#         })