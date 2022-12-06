import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stock } from 'src/app/models/Stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-create-stock-dialog',
  templateUrl: './create-stock-dialog.component.html',
  styleUrls: ['./create-stock-dialog.component.css']
})
export class CreateStockDialogComponent implements OnInit {

  stockDetails = new Stock();
  addStockDetailsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private stockService: StockService) { }

  ngOnInit(): void {
    this.createAddnewStockDetailsForm();
  }

  createAddnewStockDetailsForm() {
    this.addStockDetailsForm = this.formBuilder.group({
      stockName: ['', Validators.required],
      stockDescription: ['', Validators.required]
    });
  }

  onSubmitAddnewStockDetailsForm() {
    this.stockDetails.stockName = this.addStockDetailsForm.controls['stockName'].value;
    this.stockDetails.description = this.addStockDetailsForm.controls['stockDescription'].value;

    this.stockService.createdNewStock(this.stockDetails).subscribe((data) => {
      console.log(data);
    },(err) => {
      console.log(err);
    })
  }

}
