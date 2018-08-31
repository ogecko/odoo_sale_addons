Website Coupon Code v10
=======================
Manage Website Coupon Codes for Products/Categories/All Products & Its Redeem Operations

Features(base version: 10.0.1)
==============================

* Create and configure vouchers for providing a discount for a single product.
* Generate a unique code for each coupon.
* Limit the usage of coupons by each user.
* Provide a validity for the coupons.
* History of coupons used by each customer.

Additional Features (version: 10.0.2)
=====================================

* Create and configure vouchers for a category of products.
* Create and configure vouchers for all the products.
* The coupon cannot be applied, if the coupon value is greater than the total amount of an order.

Installation
============

- www.odoo.com/documentation/10.0/setup/install.html
- Install our custom addon

Configuration
=============

After installing the module, go to sales and create vouchers from the vouchers menu. After voucher is created, we can
generate the coupons related to this voucher. Now go to website, go to cart and under the customize menu, enable the
voucher code option.

License
=======
GNU LESSER GENERAL PUBLIC LICENSE, Version 3 (LGPLv3)
(http://www.gnu.org/licenses/agpl.html)

Bug Tracker
===========
Bugs are tracked on GitHub Issues. In case of trouble, please check there if your issue has already been reported.

PROBLEM 1: Cannot install this module (issue finding View/Shopping Cart Lines xml entry to replace)
This module as well as website_sale_options and product_minimum_quantity all try to modify this view. 
The priority of this modules modifications has been reduced to 30 so that it is applied last to fix this issue (see templates.xml).

PROBLEM 2: Vouchers are attributed to the currently signed in user rather than sender
The website_tpp module streamlines the creation of billing and shipping partners significantly over the standard odoo website_sale_options
Need to change the attribution of vouchers to the order.partner_id
This should be done on the payment page, rather than cart page (as we dont know the buyer at this stage)
The /shop/gift_coupon needs to be modified to return to the payment page

PROBLEM 3: Need to manually add the Voucher Code entry form to the payment page
Has the coupon entry been added to the right column, manually add it to the payment view 
            <h4>Voucher Code</h4>
            <p>
                        Have a voucher code? Fill this field and apply.
                      </p>
            <t t-if="coupon_not_available">
                <t t-if="coupon_not_available=='1'">
                    <p class="bg-warning">This gift code is not available</p>
                </t>
                <t t-if="coupon_not_available=='2'">
                    <p class="bg-warning">This gift code is not available</p>
                </t>
                <t t-if="coupon_not_available=='3'">
                    <p class="bg-warning">The discount amount is too large</p>
                </t>
            </t>
            <form t-if="website_sale_order and website_sale_order.website_order_line" action="/shop/gift_coupon" method="post" class="mb32">
                <input type="hidden" name="csrf_token" t-att-value="request.csrf_token()" />
                <div class="input-group">
                    <input name="promo_voucher" class="form-control" type="text" placeholder="code..." t-att-value="website_sale_order.pricelist_id.code or None" />
                    <div class="input-group-btn">
                        <a class="btn btn-default a-submit">Apply</a>
                    </div>
                </div>
            </form>

Credits
=======
* Cybrosys Techno Solutions<https://www.cybrosys.com>

Author
------

Developer: Linto CT @ cybrosys, linto@cybrosys.in

Maintainer
----------

This module is maintained by Cybrosys Technologies.

For support and more information, please visit https://www.cybrosys.com.
