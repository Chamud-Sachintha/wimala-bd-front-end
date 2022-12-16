import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ChemicalDetails } from 'src/app/models/ChemicalDetails';
import { NilonDetails } from 'src/app/models/NilonDetails';
import { TobaccoLeaves } from 'src/app/models/TobaccoLeaves';
import { WrappingLeaves } from 'src/app/models/WrappingLeaves';
import { ManageStockItemService } from 'src/app/services/manage-stock-item.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-update-stock-item',
  templateUrl: './update-stock-item.component.html',
  styleUrls: ['./update-stock-item.component.css']
})
export class UpdateStockItemComponent implements OnInit {

  updateWrappingLeavesForm!: FormGroup;
  updateTobaccoLeavesForm!: FormGroup;
  updateNilondetailsForm!: FormGroup;
  updateChemicalDetailsForm!: FormGroup;
  wrappingLeave = new WrappingLeaves();
  tobaccoLeave = new TobaccoLeaves();
  nilondetails = new NilonDetails();
  chemicalDetails = new ChemicalDetails();
  stockId!: string;
  refNo!: string;

  constructor(public dialogRef: MatDialogRef<UpdateStockItemComponent>, @Inject(MAT_DIALOG_DATA) public mydata: any,
              private formBuilder: FormBuilder, private stockService: StockService, private manageStockItemsService: ManageStockItemService,
              private notify: ToastrService) { }

  ngOnInit(): void {
    this.stockId = this.mydata.stockId;

    if (this.mydata.isWrappingLeave) {
      this.refNo = this.mydata.refNo;

      this.createUpdateWrappingLeavesForm();
      this.getWrappingLeavesByRefNoAndStockId();
    } else if (this.mydata.isTobaccoLeave) {
      this.refNo = this.mydata.refNo;

      this.createUpdateTobaccoLeavesForm();
      this.getTobaccoLeavesByRefNoAndStockId();
    } else if (this.mydata.isNilon) {
      this.refNo = this.mydata.refNo;

      this.createUpdateNilondetailsForm();
      this.getNilonDetailsByRefNoAndStockId();
    } else if (this.mydata.isChemical) {
      this.refNo = this.mydata.refNo;

      this.createUpdateChemicalDetailsForm();
      this.getChemicaldetailsByRefNoAndStockId();
    }
  }

  onSubmitUpdateChemicalDetailsForm() {
    this.chemicalDetails.chemicalName = this.updateChemicalDetailsForm.controls['chemicalName'].value;
    this.chemicalDetails.chemicalType = this.updateChemicalDetailsForm.controls['chemicalType'].value;
    this.chemicalDetails.quantity = this.updateChemicalDetailsForm.controls['quantity'].value;
    this.chemicalDetails.price = this.updateChemicalDetailsForm.controls['price'].value;
    this.chemicalDetails.date = this.updateChemicalDetailsForm.controls['date'].value;

    this.manageStockItemsService.updateChemicalDetailsByRefNoAndStockid(this.refNo, this.stockId, this.chemicalDetails).subscribe((data) => {
      this.notify.success("Updated Successfully.");
    }, (err) => {
      this.notify.error("There is an Error Occur");
    })  
  }

  getChemicaldetailsByRefNoAndStockId() {
    this.stockService.getChemicalDetailsByRefNoAndStockId(this.refNo, this.stockId).subscribe((data) => {
      this.updateChemicalDetailsForm.controls['chemicalName'].setValue(data.chemicalName);
      this.updateChemicalDetailsForm.controls['chemicalType'].setValue(data.chemicalType);
      this.updateChemicalDetailsForm.controls['quantity'].setValue(data.quantity);
      this.updateChemicalDetailsForm.controls['price'].setValue(data.price);
      this.updateChemicalDetailsForm.controls['date'].setValue(data.date);
    })
  }

  createUpdateChemicalDetailsForm() {
    this.updateChemicalDetailsForm = this.formBuilder.group({
      chemicalName: ['', Validators.required],
      chemicalType: ['' ,Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    })
  }

  onSubmitUpdateNilonDetailsForm() {
    this.nilondetails.nilonType = this.updateNilondetailsForm.controls['nilonType'].value;
    this.nilondetails.quantity = this.updateNilondetailsForm.controls['quantity'].value;
    this.nilondetails.price = this.updateNilondetailsForm.controls['price'].value;
    this.nilondetails.date = this.updateNilondetailsForm.controls['date'].value;
    this.nilondetails.stock_id = this.stockId;

    this.manageStockItemsService.updateNilondetailsByRefNoAndStockId(this.refNo, this.stockId, this.nilondetails).subscribe((data) => {
      this.notify.success("Updated Successfully.");
    }, (err) => {
      this.notify.error("There is an Error Occur");
    })  
  }

  createUpdateNilondetailsForm() {
    this.updateNilondetailsForm = this.formBuilder.group({
      nilonType: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    })
  }

  getNilonDetailsByRefNoAndStockId() {
    this.stockService.getNilondetailsByRefNoAndStockId(this.refNo, this.stockId).subscribe((data) => {
      this.updateNilondetailsForm.controls['nilonType'].setValue(data.nilonType);
      this.updateNilondetailsForm.controls['date'].setValue(data.date);
      this.updateNilondetailsForm.controls['quantity'].setValue(data.quantity);
      this.updateNilondetailsForm.controls['price'].setValue(data.price)
    })
  }

  onSubmitUpdateTobaccoLeavesForm() {
    this.tobaccoLeave.tobaccoType = this.updateTobaccoLeavesForm.controls['tobaccoType'].value;
    this.tobaccoLeave.quantity = this.updateTobaccoLeavesForm.controls['quantity'].value;
    this.tobaccoLeave.price = this.updateTobaccoLeavesForm.controls['price'].value;
    this.tobaccoLeave.date = this.updateTobaccoLeavesForm.controls['date'].value;
    this.tobaccoLeave.stock_id = this.stockId;

    this.manageStockItemsService.updateWrappingLeavesByRefNoAndStockId(this.refNo, this.stockId, this.wrappingLeave).subscribe((data) => {
      this.notify.success("Updated Successfully.");
    }, (err) => {
      this.notify.error("There is an Error Occur");
    })  
  }

  createUpdateTobaccoLeavesForm() {
    this.updateTobaccoLeavesForm = this.formBuilder.group({
      tobaccoType: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    })
  }

  getTobaccoLeavesByRefNoAndStockId() {
    this.stockService.getTobaccoLeavesByRefNoAndStockId(this.refNo, this.stockId).subscribe((data) => {
      this.updateTobaccoLeavesForm.controls['tobaccoType'].setValue(data.tobaccoType);
      this.updateTobaccoLeavesForm.controls['quantity'].setValue(data.quantity);
      this.updateTobaccoLeavesForm.controls['price'].setValue(data.price);
      this.updateTobaccoLeavesForm.controls['date'].setValue(data.date);
    })
  }

  getWrappingLeavesByRefNoAndStockId() {
    this.stockService.getWrappingLeavesByRefNoAndStockId(this.refNo, this.stockId).subscribe((data) => {
      this.updateWrappingLeavesForm.controls['leaveType'].setValue(data.leaveType);
      this.updateWrappingLeavesForm.controls['quantity'].setValue(data.quantity);
      this.updateWrappingLeavesForm.controls['createdDate'].setValue(data.createdDate);
      this.updateWrappingLeavesForm.controls['unitPrice'].setValue(data.unitPrice);
    })
  }

  createUpdateWrappingLeavesForm() {
    this.updateWrappingLeavesForm = this.formBuilder.group({
      leaveType: ['', Validators.required],
      quantity: ['', Validators.required],
      createdDate: ['',Validators.required],
      unitPrice: ['', Validators.required]
    })
  }

  onSubmitUpdateWrappingLeavesForm() {
    this.wrappingLeave.leaveType = this.updateWrappingLeavesForm.controls['leaveType'].value;
    this.wrappingLeave.quantity = this.updateWrappingLeavesForm.controls['quantity'].value;
    this.wrappingLeave.unitPrice = this.updateWrappingLeavesForm.controls['unitPrice'].value;
    this.wrappingLeave.createdDate = this.updateWrappingLeavesForm.controls['unitPrice'].value;
    this.wrappingLeave.stock_id = this.stockId;

    this.manageStockItemsService.updateWrappingLeavesByRefNoAndStockId(this.refNo, this.stockId, this.wrappingLeave).subscribe((data) => {
      this.notify.success("Updated Successfully.");
    }, (err) => {
      this.notify.error("There is an Error Occur");
    })  
  }

}
