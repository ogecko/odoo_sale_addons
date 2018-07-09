# -*- coding: utf-8 -*-

from odoo import models, fields, api


class sale_order(models.Model):

    _inherit = 'sale.order'

    x_to = fields.Char(string="To")
    x_from = fields.Char(string="From")
    x_message = fields.Text(string="Message")

