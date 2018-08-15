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

        # if form posted
        if 'name' in post:
            values = {
                'x_snd_name': post['name'],
                'x_snd_email': post['email'],
                'x_snd_phone': post['phone'],
                'x_from': post['x_from'],
                'x_to': post['x_to'],
                'x_message': post['x_message'],
            }
            order.write(values)
            return request.redirect("/shop/delivery")

        # otherwise form has just been called up
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

        # if form posted
        if 'name' in post:
            values = {
                'x_rcv_name': post['name'],
                'x_rcv_email': post['email'],
                'x_rcv_phone': post['phone'],
                'x_rcv_address': post['address'],
                'x_rcv_special': post['special'],
                'x_start': post['x_start'],
                'x_subscription': post['x_subscription'],
                'x_freq': post['x_freq'],
                'x_number': post['x_number'],
                'x_days': post['x_days'],
            }
            order.write(values)
            return request.redirect("/shop/payment")

        # otherwise form has just been called up
        values = {
            'order': order,
        }

         # Avoid useless rendering if called in ajax
        if post.get('xhr'):
            return 'ok'
        return request.render("website_tpp.order_form_delivery", values)

