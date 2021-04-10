from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'website.config.settings'

    google_tag_manager_key = fields.Char(
        'Container ID',
        related='website_id.google_tag_manager_key')

