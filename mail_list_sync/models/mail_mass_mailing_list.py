# -*- coding: utf-8 -*-
# Copyright 2017 Tecnativa - Jairo Llopis
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

from odoo import api, fields, models
from odoo.tools import safe_eval


class MassMailingList(models.Model):
    _inherit = "mail.mass_mailing.list"

    dynamic = fields.Boolean(
        help="Set this list as dynamic, to make it autosynchronized with "
             "orders from a given criteria.",
    )
    sync_method = fields.Selection(
        [
            ("sender", "Senders: Add new emails from order sender details"),
            ("recipient", "Recipients: Add new emails from order recipient details"),
        ],
        default="sender",
        required=True,
        help="Choose the syncronization method for this list if you want to "
             "make it dynamic",
    )
    is_synced = fields.Boolean(
        help="Helper field to make the user aware of unsynced changes",
        default=True,
    )

    def action_sync(self):
        """Sync contacts in dynamic lists."""
        Contact = self.env["mail.mass_mailing.contact"].with_context(syncing=True)
        extract_methods = {
            "sender": { "model": "sale.order", "email": "x_snd_email", "name": "x_snd_name" },
            "recipient": { "model": "sale.order", "email": "x_rcv_email", "name": "x_rcv_name" },
        }
        # Skip non-dynamic lists
        dynamic = self.filtered("dynamic")
        for one in dynamic:
            extract = extract_methods[one.sync_method]
            x_model = self.env[extract["model"]].with_context(syncing=True)
            sync_domain = [(extract["email"], "!=", "")]    
            desired_contacts = x_model.search(sync_domain)
            desired_contacts_emailname = [] if  len(desired_contacts)==0 else desired_contacts.mapped(lambda r: { "email": r[extract["email"]].lower(), "name": r[extract["name"]], "isNew": True })
            current_contacts = Contact.search([("list_id", "=", one.id)])
            current_contacts_emailname = [] if  len(current_contacts)==0 else current_contacts.mapped(lambda r: { "email": r.email.lower(), "name": r.name, "isNew": False })
            unique_contacts = { r["email"]: r for r in desired_contacts_emailname + current_contacts_emailname }.values()
            new_unique_contacts = [r for r in unique_contacts if r["isNew"]]
            # Add new contacts
            for new_contact in new_unique_contacts:
                Contact.create({
                    "list_id": one.id,
                    "email": new_contact["email"],
                    "name": new_contact["name"],
                })

            one.is_synced = True

        # Invalidate cached contact count
        self.invalidate_cache(["contact_nbr"], dynamic.ids)

    @api.onchange("dynamic", "sync_method")
    def _onchange_dynamic(self):
        if self.dynamic:
            self.is_synced = False
