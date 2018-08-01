# -*- coding: utf-8 -*-
{
    'name': "Web Vue",

    'summary': "Adds Vue.js support to Odoo Web",

    'description': """
        Simply adds the Vue.js library to Odoo on the client side. Allows Vue components to be prototyped and incorporated into the Odoo user interface.
    """,

    'author': "oGecko Solutions",
    'website': "http://www.ogecko.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    
    'category': 'Web',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'web'],

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