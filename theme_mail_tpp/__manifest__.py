# -*- encoding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'TPP Mass Mail Theme',
    'summary': 'Support custom for Mass Mailing Theme',
    'description': 'This theme module allows tailoring of the theme that can be used in the mass mailing module.',
    'author': "oGecko Solutions",
    'website': "http://www.ogecko.com",
    'category': 'Theme',
    'version': '1.0',
    'depends': ['base', 'web', 'mass_mailing'],
    'data': [
        "views/email_designer_themes.xml",
        "views/theme_boilerplate_less.xml",
        "views/theme_boilerplate_template.xml",
        "views/theme_boilerplate_snippets.xml",
    ],
    'images': ['static/description/bootswatch.png'],
    'application': False,
}

