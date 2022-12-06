import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.css']
})
export class StockManagementComponent implements OnInit {

  active = 1;
  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  onClickBackToStockPage() {
	this.router.navigate(['app/admin/stock-management']);
  }

}
