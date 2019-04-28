# -*- coding: utf-8 -*-
{
    "name": "Mailing List Sync",

    "summary": "Mass mailing lists that get autopopulated from web orders",
    
    'description': """
        Adds an option to allow a Mailing List to be dynamically populated from fields in a sales order. 
        Before any mass mailing, new emails from sales orders are autopopulated into the dynamic mail list.
        It only adds new emails and obeys when emails are opt out.
    """,


    "author": "oGecko Solutions",
    "website": "http://www.ogecko.com",
    
    "category": "Marketing",
    "version": "10.0.1.2.0",

    "application": False,
    "installable": True,

    "depends": [ "mass_mailing_partner", "sale" ],

    "data": [
        "views/mail_mass_mailing_list_view.xml",
        # "wizards/mail_mass_mailing_load_filter_views.xml",
    ],
}
