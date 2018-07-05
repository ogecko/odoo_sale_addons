# -*- coding: utf-8 -*-

from odoo import models, fields, api

class SaleOrderLine(models.Model):
    _inherit = "sale.order.line"

    def check_min_quantity(self):
        line_min = self.product_id.min_quantity or 0
        if self.product_uom_qty < line_min:
            self.product_uom_qty = line_min

    @api.multi
    @api.onchange('product_id')
    def product_id_change(self):
        self.check_min_quantity()
        return super(SaleOrderLine, self).product_id_change()


    @api.onchange('product_uom', 'product_uom_qty')
    def product_uom_change(self):
        self.check_min_quantity()
        return super(SaleOrderLine, self).product_uom_change()


