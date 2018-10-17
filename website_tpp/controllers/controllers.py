# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request
from odoo.addons.website_sale.controllers.main import WebsiteSale
from odoo.addons.website_sale.controllers import main

# Products per row and products per page
main.PPR = 3
main.PPG = 12

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

            # create a sending/billing partner if neccessary
            if not(isSignedIn):
                if not(post['x_snd_email']):
                    post['x_snd_email'] = 'unknown@email.com'
                if not(post['x_snd_name']):
                    post['x_snd_name'] = 'Unknown'
                Partner = request.env['res.partner']
                existing = Partner.sudo().search([("email","=",post['x_snd_email'])], limit=1)
                if len(existing) == 1:
                    partner_id = existing.id
                else:
                    new_values = {}
                    new_values['customer'] = True
                    new_values['team_id'] = request.website.salesteam_id and request.website.salesteam_id.id
                    lang = request.lang if request.lang in request.website.mapped('language_ids.code') else None
                    if lang:
                        new_values['lang'] = lang
                    new_values['name'] = post['x_snd_name']
                    new_values['phone'] = post['x_snd_phone']
                    new_values['email'] = post['x_snd_email']
                    partner_id = Partner.sudo().create(new_values).id
                order.partner_id = partner_id
                order.onchange_partner_id()
                order.message_partner_ids = [(4, partner_id), (3, request.website.partner_id.id)]

            # store the new values into the order
            values = {}
            for field_name, field_value in post.items():
                if field_name in request.env['sale.order']._fields and field_name.startswith('x_'):
                    values[field_name] = field_value
            if values:
                order.write(values)
            return request.redirect("/shop/delivery")

        # OTHERWISE, its a form intial callup, so lets get values and show
        # copy across from parter_id when the user is signed in already
        if (isBlankSndName and isSignedIn):
            order.x_snd_name = order.partner_id.name
            order.x_snd_email = order.partner_id.email
            order.x_snd_phone = order.partner_id.phone

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
        isSubscriptionOrder = request.env['sale.order.line'].sudo().search([('order_id', '=', order.id), ('name', 'like', 'Posy Subscription')], count=True) > 0
        order.x_subscription = isSubscriptionOrder

        # if form posted
        if 'x_rcv_name' in post:

            # create a delivery partner if neccessary
            if post['x_rcv_name'] and post['x_rcv_address']:
                Partner = request.env['res.partner']
                existing = Partner.sudo().search([
                    ("name","=",post['x_rcv_name']),
                    ("parent_id","=",order.partner_id.id),
                    ], limit=1)
                if len(existing) == 1:
                    partner_id = existing.id
                else:
                    new_values = {}
                    new_values['customer'] = True
                    new_values['type'] = 'delivery'
                    new_values['parent_id'] = order.partner_id.id
                    new_values['team_id'] = request.website.salesteam_id and request.website.salesteam_id.id
                    lang = request.lang if request.lang in request.website.mapped('language_ids.code') else None
                    if lang:
                        new_values['lang'] = lang
                    new_values['name'] = post['x_rcv_name']
                    new_values['phone'] = post['x_rcv_phone']
                    new_values['email'] = post['x_rcv_email']
                    new_values['street'] = post['x_rcv_street']
                    new_values['city'] = post['x_rcv_city']
                    new_values['zip'] = post['x_rcv_zip']
                    state = request.env['res.country.state'].search([("code","=",post['x_rcv_state'])], limit=1)
                    if len(state) == 1:
                        new_values['state_id'] = state.id
                    country = request.env['res.country'].search([("name","=",post['x_rcv_country'])], limit=1)
                    if len(country) == 1:
                        new_values['country_id'] = country.id
                    partner_id = Partner.sudo().create(new_values).id
                order.partner_shipping_id = partner_id
                order.message_partner_ids = [(4, partner_id), (3, request.website.partner_id.id)]

            # set the delivery method
            if post['x_rcv_city']:
                default_carrier = request.env.ref('country_state_city.delivery_zone_exclude')
                city = request.env['res.country.state.city'].search([("name","=",post['x_rcv_city'])], limit=1)
                order.carrier_id = city.delivery_id if len(city)==1 else default_carrier
                order.delivery_set()
                # set an extra delivery charge for hospitals, schools and universities
                if post['x_rcv_is_extra'] == 'true':
                    carrier = request.env.ref('country_state_city.delivery_extra').sudo()
                    order._create_delivery_line(carrier, carrier.fixed_price)

            # set the quantity
            if post['x_number']:
                request.env['sale.order.line'].sudo().search([('order_id', '=', order.id), ('name', '=', 'Gift Coupon')]).unlink()
                for line in order.order_line:
                    order._cart_update(product_id=line.product_id.id, line_id=line.id, set_qty=post['x_number'])

            # store the new values into the order
            values = {}
            for field_name, field_value in post.items():
                if field_name in request.env['sale.order']._fields and field_name.startswith('x_'):
                    values[field_name] = field_value
            if values:
                order.write(values)

            # confirm the order (so we dont need to go via /shop/confirm_order)
            request.session['sale_last_order_id'] = order.id
    
            return request.redirect("/shop/payment")

        # OTHERWISE, its a form intial callup, so lets get values and show
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




    # add redirections for the old Rocketspark links 
    @http.route(['/shop/checkout_finish'], type='http', auth="public", website=True)
    def redir_checkout_finish(self, **post):
        return request.redirect("/shop/confirmation")

    @http.route(['/page/gallery-and-reviews'], type='http', auth="public", website=True)
    def redir_gallery_and_reviews(self, **post):
        return request.redirect("/page/larger")

    @http.route(['/page/events-and-corporate'], type='http', auth="public", website=True)
    def redir_events_and_corporate(self, **post):
        return request.redirect("/page/larger")

    @http.route(['/page/terms'], type='http', auth="public", website=True)
    def redir_terms(self, **post):
        return request.redirect("/page/terms-and-conditions")

    @http.route(['/page/about'], type='http', auth="public", website=True)
    def redir_about(self, **post):
        return request.redirect("/page/aboutus")


    # Page to update product images
    @http.route(['/page/daily'], type='http', auth="user", website=True)
    def daily_update(self, **post):
        # grab the daily posy and variants
        pdaily = http.request.env["product.template"].browse([1])
        psmall = http.request.env["product.product"].browse([3])
        pmedium = http.request.env["product.product"].browse([4])
        plarge = http.request.env["product.product"].browse([5])

        is_posted = False
        # if form posted
        if 'x_description' in post:
            pdaily.write({ 'description_sale': post['x_description'] })
            is_posted = True
        if 'x_small' in post and len(post['x_small'])>20:
            psmall.write({ 'image': post['x_small'] })
            is_posted = True
        if 'x_medium' in post and len(post['x_medium'])>20:
            pmedium.write({ 'image': post['x_medium'] })
            is_posted = True
        if 'x_large' in post and len(post['x_large'])>20:
            plarge.write({ 'image': post['x_large'] })
            is_posted = True
        if 'x_primary' in post and len(post['x_primary'])>20:
            pdaily.write({ 'image': post['x_primary'] })
            if 'x_duplicate' in post:
                psmall.write({ 'image': post['x_primary'] })
                pmedium.write({ 'image': post['x_primary'] })
                plarge.write({ 'image': post['x_primary'] })
            is_posted = True
        if (is_posted):
            return request.redirect("/")

        # otherwise form has just been called up
        values = {
            'description': pdaily.description_sale,
        }

         # Avoid useless rendering if called in ajax
        if post.get('xhr'):
            return 'ok'        
        return request.render("website_tpp.order_form_daily", values)


    # Interface for TPP Operations to ship orders
    @http.route('/web/ordership', auth='public', type='json')
    def ordership(self, **kw):
        _logger.info('Ship Order %s / %s', kw['order'], kw['delivery'])  # debug
        return {}

    # Interface for TPP Operations to scrape orders
    @http.route('/web/orderjson', auth='public', type='json')
    def geojson(self, **kw):
        domain = [('state','=','sale')]
        if 'start' in kw:
            domain.append(('write_date','>=', kw['start']))

        orders = http.request.env["sale.order"].sudo().search(domain, limit=50)
        res = { 
            "orders": [] 
        }
        for order in orders:
            res["orders"].append({
                'id': order.name,
                'date_order': order.date_order, 
                'write_date': order.write_date, 
                'state': order.state, 
                'snd': {
                    'name': order.x_snd_name, 
                    'email': order.x_snd_email, 
                    'phone': order.x_snd_phone, 
                },
                'card': {
                    'to': order.x_to, 
                    'from': order.x_from, 
                    'message': order.x_message, 
                },
                'rcv': {
                    'name': order.x_rcv_name, 
                    'email': order.x_rcv_email, 
                    'phone': order.x_rcv_phone, 
                    'address': order.x_rcv_address, 
                    'special': order.x_rcv_special, 
                    'latitude': order.x_rcv_latitude, 
                    'longitude': order.x_rcv_longitude, 
                },
                'delivery': {
                    'start': order.x_start, 
                    'subscription': order.x_subscription, 
                    'number': order.x_number, 
                    'freq': order.x_freq, 
                    'days': order.x_days, 
                },
                'lines': [],
                'amount_total': order.amount_total, 
                'amount_tax': order.amount_tax, 
            })
            for line in order.order_line:
                res["orders"][-1]['lines'].append({
                    'name': line.product_id.name,
                    'display_name': line.product_id.display_name,
                    'qty': line.product_qty,
                })
        return res

