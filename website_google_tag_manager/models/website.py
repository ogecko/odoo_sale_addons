from odoo import fields, models


class Website(models.Model):
    _inherit = 'website'

    google_tag_manager_key = fields.Char("Container ID")

    