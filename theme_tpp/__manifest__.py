# -*- encoding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'TPP Themes',
    'summary': 'Support for TPP Bootswatch themes in master',
    'description': 'This theme module is exclusively for master to keep the support of Bootswatch themes which were previously part of the website module in 8.0.',
    'category': 'Theme',
    'sequence': 900,
    'version': '1.0',
    'depends': ['website'],
    'data': [
        'data/theme_tpp_data.xml',
        'views/theme_tpp_templates.xml',
    ],
    'images': ['static/description/bootswatch.png'],
    'application': False,
}
