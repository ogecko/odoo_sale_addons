# -*- coding: utf-8 -*-
##############################################################################
#
##############################################################################
from odoo import fields, models


class product_template(models.Model):

    _inherit = 'product.template'

    min_quantity = fields.Float('Min Order Quantity', size=64, default=0)



