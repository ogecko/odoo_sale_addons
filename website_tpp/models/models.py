# -*- coding: utf-8 -*-

from odoo import models, fields, api

class sale_order(models.Model):

    _inherit = 'sale.order'

    x_snd_name = fields.Char(string="Sender Name")
    x_snd_email = fields.Char(string="Sender Email")
    x_snd_phone = fields.Char(string="Sender Phone")

    x_to = fields.Char(string="Message To")
    x_from = fields.Char(string="Message From")
    x_message = fields.Text(string="Message")

    x_rcv_name = fields.Char(string="Receiver Name")
    x_rcv_email = fields.Char(string="Receiver Email")
    x_rcv_phone = fields.Char(string="Receiver Phone")
    x_rcv_address = fields.Text(string="Delivery Address")
    x_rcv_special = fields.Text(string="Special Instructions")
    x_rcv_latitude = fields.Char(string="Latitude")
    x_rcv_longitude = fields.Char(string="Longitude")

    x_start = fields.Date(string="Starting Day", default=fields.Date.today())
    x_subscription = fields.Boolean(string="Order contains multiple deliveries")
    x_freq = fields.Selection(string="Delivery Frequency", selection=[('Daily','Daily'),('Weekly','Weekly'),('Fortnightly','Fortnightly'),('Monthly','Monthly'),('Other','Other')])
    x_number = fields.Integer(string="Number of Deliveries")
    x_days = fields.Char(string="Delivery Days")

