# -*- coding: utf-8 -*-
# This is a special controller to handle WebHook calls from Mailgun for mail tracking
# It is based on the oca/social/mail_tracking package
# Although it provides a JSON endpoint for the Webhook which is compatible with Mailgun (rather than http endpoint)

import werkzeug
from psycopg2 import OperationalError
from odoo import api, http, registry, SUPERUSER_ID
import logging
_logger = logging.getLogger(__name__)

BLANK = 'R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='


def _env_get(db, callback, tracking_id, event_type, **kw):
    res = 'NOT FOUND'
    reg = False
    current = http.request.db and db == http.request.db
    env = current and http.request.env
    if not env:
        with api.Environment.manage():
            try:
                reg = registry(db)
            except OperationalError:
                _logger.warning("Selected BD '%s' not found", db)
            except:  # pragma: no cover
                _logger.warning("Selected BD '%s' connection error", db)
            if reg:
                _logger.info("New environment for database '%s'", db)
                with reg.cursor() as new_cr:
                    new_env = api.Environment(new_cr, SUPERUSER_ID, {})
                    res = callback(new_env, tracking_id, event_type, **kw)
                    new_env.cr.commit()
    else:
        # make sudo when reusing environment
        env = env(user=SUPERUSER_ID)
        res = callback(env, tracking_id, event_type, **kw)
    return res


class MailTrackingMailgunController(http.Controller):

    def _request_metadata(self):
        request = http.request.httprequest
        return {
            'ip': request.remote_addr or False,
            'user_agent': request.user_agent or False,
            'os_family': request.user_agent.platform or False,
            'ua_family': request.user_agent.browser or False,
        }

    def _tracking_open(self, env, tracking_id, event_type, **kw):
        tracking_email = env['mail.tracking.email'].search([
            ('id', '=', tracking_id),
        ])
        if tracking_email:
            metadata = self._request_metadata()
            tracking_email.event_create('open', metadata)
        else:
            _logger.warning(
                "MailTracking email '%s' not found", tracking_id)

    def _tracking_event(self, env, tracking_id, event_type, **kw):
        metadata = self._request_metadata()
        return env['mail.tracking.email'].event_process(
            http.request, kw, metadata, event_type=event_type)

    @http.route('/mail/tracking/mailgun/<string:db>',
                type='json', auth='none', csrf=False)
    def mail_tracking_all(self, db, **kw):
        return _env_get(db, self._tracking_event, None, None, **kw)

