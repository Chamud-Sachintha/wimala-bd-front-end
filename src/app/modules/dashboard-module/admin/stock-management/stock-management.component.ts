import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.css']
})
export class StockManagementComponent implements OnInit {

  active = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
