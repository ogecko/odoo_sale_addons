# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request
from odoo.addons.website_sale.controllers.main import WebsiteSale

# extend the WebsiteSale Class
class WebsiteSaleTPP(WebsiteSale):

# override the /shop/checkout route (with its ugly billing/shipping address forms)
    @http.route(['/shop/checkout'], type='http', auth="public", website=True)
    def checkout(self, **post):
        order = request.website.sale_get_order()

        redirection = self.checkout_redirection(order)
        if redirection:
            return redirection

        values = {
            'order': order,
        }

         # Avoid useless rendering if called in ajax
        if post.get('xhr'):
            return 'ok'
        return request.render("website_tpp.order_form_sender", values)

# add the /shop/delivery route
    @http.route(['/shop/delivery'], type='http', auth="public", website=True)
    def delivery(self, **post):
        order = request.website.sale_get_order()

        redirection = self.checkout_redirection(order)
        if redirection:
            return redirection

        values = {
            'order': order,
        }

         # Avoid useless rendering if called in ajax
        if post.get('xhr'):
            return 'ok'
        return request.render("website_tpp.order_form_delivery", values)

