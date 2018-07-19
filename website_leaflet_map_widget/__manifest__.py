# -*- coding: utf-8 -*-
{
    'name': "website_leaflet_map_widget",

    'summary': "Adds Widget for a Leaflet map",

    'description': """
        Adds ability to insert a map onto a page with the addition of geoJSON geometries overlaid with Odoo data
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
        'demo/demo.xml',
    ],
}