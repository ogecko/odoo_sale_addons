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

        # setup variables
        isSignedIn = not(order.partner_id.id == request.website.user_id.sudo().partner_id.id)
        isBlankSndName = not(order.x_snd_name)
 
        # if form posted
        if 'x_snd_name' in post:
            values = {}
            for field_name, field_value in post.items():
                if field_name in request.env['sale.order']._fields and field_name.startswith('x_'):
                    values[field_name] = field_value
            if values:
                order.write(values)
            return request.redirect("/shop/delivery")

        # copy across from parter_id when the user is signed in already
        if (isBlankSndName and isSignedIn):
            order.x_snd_name = order.partner_id.name
            order.x_snd_email = order.partner_id.email
            order.x_snd_phone = order.partner_id.phone

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

        # setup variables
        google_maps_api_key = request.env['ir.config_parameter'].sudo().get_param('google_maps_api_key')
        isBlankRcvName = not(order.x_rcv_name)
        isBlankTo = not(order.x_to)

        # if form posted
        if 'x_rcv_name' in post:

            # update subscription qty
            # for line in order.order_line.filtered(lambda l: 'subscription' in l.name.lower())
            #     line.product_qty = 6

            values = {}
            for field_name, field_value in post.items():
                if field_name in request.env['sale.order']._fields and field_name.startswith('x_'):
                    values[field_name] = field_value
            if values:
                order.write(values)
            return request.redirect("/shop/payment")

        # copy x_to name across to blank x_rcv_name (but only if blank)
        if (isBlankRcvName and not(isBlankTo)):
            order.x_rcv_name = order.x_to

        # otherwise form has just been called up
        values = {
            'order': order,
            'google_maps_api_key': google_maps_api_key,
        }

         # Avoid useless rendering if called in ajax
        if post.get('xhr'):
            return 'ok'
        return request.render("website_tpp.order_form_delivery", values)

