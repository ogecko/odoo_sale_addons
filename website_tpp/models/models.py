# -*- coding: utf-8 -*-

from odoo import models, fields, api

class sale_order(models.Model):

    _inherit = 'sale.order'

    x_snd_name = fields.Char(string="Name")
    x_snd_email = fields.Char(string="Email")
    x_snd_phone = fields.Char(string="Phone")

    x_to = fields.Char(string="To")
    x_from = fields.Char(string="From")
    x_message = fields.Text(string="Message")

    x_rcv_name = fields.Char(string="Name")
    x_rcv_email = fields.Char(string="Email")
    x_rcv_phone = fields.Char(string="Phone")
    x_rcv_address = fields.Text(string="Delivery Address")
    x_rcv_special = fields.Text(string="Special Instructions")

    x_start = fields.Date(string="Starting Day")
    x_subscription = fields.Boolean(string="Order contains multiple deliveries")
    x_freq = fields.Selection(string="Delivery Frequency", selection=[('Daily','Daily'),('Weekly','Weekly'),('Fortnightly','Fortnightly'),('Monthly','Monthly'),('Other','Other')])
    x_number = fields.Integer(string="Number of Deliveries")
    x_days = fields.Char(string="Delivery Days")

