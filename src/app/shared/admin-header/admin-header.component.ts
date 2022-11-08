import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  menuItems = [{title: '',path: '', class: ''}];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.menuCollapse();
    this.loadMainMenuItems();
  }

  // onClickCollapseMenu() {
  //   this.menuCollapse();
  // }

  loadMainMenuItems() {
    if (this.router.url.includes('admin')) {
      this.menuItems = [
        {
          title: 'Dashboard',
          path: '/app/admin',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Member Registration',
          path: '/app/admin/registration',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Stock Management',
          path: '/app/admin/stock-management',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'My Orders',
          path: '/app/customer/orders',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Add Coupons',
          path: '/add-customer',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Profile Settings',
          path: '/app/customer/profile',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Sign Out',
          path: '/add-customer',
          class: 'fa fa-home mr-3'
        }
      ];
    } else if (this.router.url.includes('user')) {
      this.menuItems = [
        {
          title: 'Dashboard',
          path: '/app/seller',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Add Reatuarants & Manage',
          path: '/app/seller/add-restuarant',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Add Category',
          path: '/app/seller/add-category',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Add Eatables',
          path: '/app/seller/add-eatables',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Order Requests',
          path: '/app/seller/order-requests',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Add Offer & Manage',
          path: '/add-seller',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Profile Settings',
          path: '/app/seller/profile',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Sign Out',
          path: '/add-seller',
          class: 'fa fa-home mr-3'
        }
      ];
    }
  }

  menuCollapse() {
    "use strict";

    var fullHeight = function () {

      $('.js-fullheight').css('height', Number($(window).height()));
      $(window).resize(function () {
        $('.js-fullheight').css('height', Number($(window).height()));
      });

    };
    fullHeight();

    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });
  }

}
