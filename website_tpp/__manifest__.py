# -*- coding: utf-8 -*-
{
    'name': "Website for The Posy Place",

    'summary': "Tailoring of Odoo e-Commerce website for The Posy Place.",

    'description': """
        Adds an Order Form for improved data entry of the Sender, Receiver, Delivery and Card information. 
        It handles all validation and edge cases to ensure quality data entry and storage.
    """,

    'author': "oGecko Solutions",
    'website': "http://www.ogecko.com",


    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Sales',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'sale', 'web', 'website', 'web_vue', 'country_state_city'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}