import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';
import { CreateStockDialogComponent } from '../../dialogs/create-stock-dialog/create-stock-dialog.component';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent implements OnInit {

  allAvailableStockDetails: any[] = [];

  constructor(private dialog: MatDialog, private stockService: StockService, private router: Router) { }

  ngOnInit(): void {
    this.getAllAvailableStockdetails();
  }

  onClickManageStock(stockId: string) {
    this.router.navigate(['app/admin/stock/manage', stockId])
  }

  openCreateStockDialog() {
    this.dialog.open(CreateStockDialogComponent, {
      data: {
        
      },
      width: '600px',
      backdropClass: 'backdropBackground',
    });
  }

  getAllAvailableStockdetails() {
    this.stockService.getAlllAvailableStocks().subscribe((data) => {
      data.forEach((el) => {
        this.allAvailableStockDetails.push(el);
      })
    })
  }

}
