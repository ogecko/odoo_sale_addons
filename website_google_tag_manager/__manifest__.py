# -*- coding: utf-8 -*-
{
    'name': "Website Google Tag Manager",

    'summary': "Add support for Google Tag Manager",

    'description': """
        Adds the Google Tag Manager code to the header and body of all website pages. The GTM code is configured in Website Configuration Settings.
    """,

    'author': "oGecko Solutions",
    'website': "http://www.ogecko.com",


    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Website',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'web', 'website'],

    # always loaded
    'data': [
        'views/res_config_settings_view.xml',
        'views/website_views.xml',
        'views/website_templates.xml'
    ],
}