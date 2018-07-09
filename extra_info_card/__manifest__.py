# -*- coding: utf-8 -*-
{
    'name': "Extra Info Card",

    'summary': "Collect extra info for a personalised card (x_to, x_from, x_message)",

    'description': """
This module tailors the extra info step in the e-commerce cart to collect the information needed for a gift card to be printed and sent with each order. 
For this form to be visible in the checkout process you will need to enable the Extra Info Step from the Customise menu on the Shipping & Billing tab.
    """,

    'author': "oGecko Solutions",
    'website': "http://www.ogecko.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Sales Management',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': [
        'base','sale', 'website_sale',
    ],
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