# -*- coding: utf-8 -*-
{
    'name': "City Based Defaults",

    'summary': "Adds City Model and defaults for Sales Order Delivery Method and Warehouse (based on Shipping Address City)",

    'description': """
        Allows a metropolitan area within a state to be divided up into regions and cities. Each City
        can be allocated to a particular Delivery Method and Warehouse. When Sales orders are processed
        if the Shipping Address City is matched it will automatically allocate the Delivery Method and
        Warehouse to fulfill the order. 
        
        This allows fine grained control over charging for delivery and 
        allocation to which warehouse is responsible for fulfilling the order.
    """,

    'author': "oGecko Solutions",
    'website': "http://www.ogecko.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Sales',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'website_sale'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
    ],
}