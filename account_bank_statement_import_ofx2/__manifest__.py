# -*- coding: utf-8 -*-
{
    'name': 'Import OFX2 Bank Statement',

    'summary': "Imports Bank Statements using OFX format from banks like CBA, St George etc",

    'description': """
        This module adds support for the import of bank statements in `OFX format <https://en.wikipedia.org/wiki/Open_Financial_Exchange>`_.

        This module is based on the module from OCA bank-statement-import/account-bank-statement-import-ofx
        It has been modified to be more tollerant of finanicial entries without FIDs. 
    """,

    'category': 'Banking addons',
    'version': '0.1',
    'author': "oGecko Solutions",
    'website': "http://www.ogecko.com",
    'depends': [
        'account_bank_statement_import',
    ],
    'data': [
        'views/view_account_bank_statement_import.xml',
    ],
    # 'external_dependencies': {
    #     'python': ['ofxparse'],
    # },
    'installable': True,
}
