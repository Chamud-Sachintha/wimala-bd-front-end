import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { ChemicalDetails } from 'src/app/models/ChemicalDetails';
import { NilonDetails } from 'src/app/models/NilonDetails';
import { TobaccoLeaves } from 'src/app/models/TobaccoLeaves';
import { WrappingLeaves } from 'src/app/models/WrappingLeaves';
import { ManageStockItemService } from 'src/app/services/manage-stock-item.service';
import { StockService } from 'src/app/services/stock.service';
import { runInThisContext } from 'vm';
import { UpdateStockItemComponent } from '../../dialogs/update-stock-item/update-stock-item.component';

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.css']
})
export class StockManagementComponent implements OnInit {

  wrappingLeavesQuantity: number = 0;
  tobaccoLeavesQuantity: number = 0;
  nilonDetailsQuantity: number = 0;
  chemicalDetailsQuantity: number = 0;
  addWrappingLeavesForm!: FormGroup;
  addTobaccoLeavesForm!: FormGroup;
  addNilonDetailsForm!: FormGroup;
  addChemicalDetailsForm!: FormGroup;
  wrappingLeavesDetails = new WrappingLeaves();
  tobaccoLeavesDetails = new TobaccoLeaves();
  nilonDetails = new NilonDetails();
  chemicalDetails = new ChemicalDetails();
  allWrappingLeavesList : WrappingLeaves[] = [];
  allTobaccoLeavesList: TobaccoLeaves[] = [];
  allNilonDetailsList: NilonDetails[] = [];
  allChemicalDetailsList: ChemicalDetails[] = [];
  stockId!: any;
  active = 1;
  constructor(private activateRoutes: ActivatedRoute, private router: Router, private stockService: StockService
              , private formBuilder: FormBuilder, private notify: ToastrService, private dialog: MatDialog
              , private manageStockItemService: ManageStockItemService) {}

  ngOnInit(): void {
    this.activateRoutes.params.subscribe((param) => {
      this.stockId = param['id']
    })
    this.getStockItemQuantities()
    this.createAddWrappingLeavesForm();
    this.createAddNewTobaccoLeavesForm(); 
    this.createAddnewNilonDetailsForm();
    this.createAddChemicalDetailsForm();

    this.getWrappingLeavesByStockId();
    this.getTobaccoLeavesByStockId();
    this.getNilonDetailsListByStockId();
    this.getChemicalDetailsListByStockId();
  }

  onClickDeleteWrappingLeave(refNo: string) {
    const confirm = window.confirm("Are you sure want to delete this Item ? ");

    if (confirm) {
      this.manageStockItemService.deleteWrappingLeavesByRefNoAnd(refNo, this.stockId).subscribe((data) => {
        location.reload();
        this.notify.success("Delete Successfully.");
      },(err) => {
        this.notify.error("There is an Error Occur " + err);
      })
    }
  }

  onClickDeleteTobaccoLeaves(refNo: string) {
    const confirm = window.confirm("Are you sure want to delete this Item ? ");

    if (confirm) {
      this.manageStockItemService.deleteTobaccoLeavesByRefNoAndStockId(refNo, this.stockId).subscribe((data) => {
        location.reload();
        this.notify.success("Delete Successfully.");
      },(err) => {
        this.notify.error("There is an Error Occur " + err);
      })
    }
  }

  onClickDeleteNilondetails(refNo: string) {
    const confirm = window.confirm("Are you sure want to delete this Item ? ");

    if (confirm) {
      this.manageStockItemService.deleteNilonDetailsByRefNoAndStockId(refNo, this.stockId).subscribe((data) => {
        location.reload();
        this.notify.success("Delete Successfully.");
      },(err) => {
        this.notify.error("There is an Error Occur " + err);
      })
    }
  }

  onClickdeleteChemicaldetails(refNo: string) {
    const confirm = window.confirm("Are you sure want to delete this Item ? ");

    if (confirm) {
      this.manageStockItemService.deleteChemicalDetailsByRefNoAndStockId(refNo, this.stockId).subscribe((data) => {
        location.reload();
        this.notify.success("Delete Successfully.");
      },(err) => {
        this.notify.error("There is an Error Occur " + err);
      })
    }
  }
 
  openWrappingLeaveUpdateDialog(refNo: string) {
    this.dialog.open(UpdateStockItemComponent, {
			data: {
        refNo: refNo,
        stockId: this.stockId,
				isWrappingLeave: true,
        isTobaccoLeave: false,
        isNilon: false,
        isChemical: false
			},
			width: '600px',
			backdropClass: 'backdropBackground',
		}).afterClosed().subscribe((data) => {
			location.reload();
		});
  }

  openTobaccoLeaveUpdateDialog(refNo: string) {
    this.dialog.open(UpdateStockItemComponent, {
			data: {
        refNo: refNo,
        stockId: this.stockId,
				isWrappingLeave: false,
        isTobaccoLeave: true,
        isNilon: false,
        isChemical: false
			},
			width: '600px',
			backdropClass: 'backdropBackground',
		}).afterClosed().subscribe((data) => {
			location.reload();
		});
  }

  openNilonDetailsUpdateDialog(refNo: string) {
    this.dialog.open(UpdateStockItemComponent, {
			data: {
        refNo: refNo,
        stockId: this.stockId,
				isWrappingLeave: false,
        isTobaccoLeave: false,
        isNilon: true,
        isChemical: false
			},
			width: '600px',
			backdropClass: 'backdropBackground',
		}).afterClosed().subscribe((data) => {
			location.reload();
		});
  }

  openChemicalDetailsUpdateDialog(refNo: string) {
    this.dialog.open(UpdateStockItemComponent, {
			data: {
        refNo: refNo,
        stockId: this.stockId,
				isWrappingLeave: false,
        isTobaccoLeave: false,
        isNilon: false,
        isChemical: true
			},
			width: '600px',
			backdropClass: 'backdropBackground',
		}).afterClosed().subscribe((data) => {
			location.reload();
		});
  }

  getChemicalDetailsListByStockId() {
    this.stockService.getChemicalDetailsByStockId(this.stockId).subscribe((data) => {
      data.forEach((el) => {
        this.allChemicalDetailsList.push(el);
      })
    })
  }

  getNilonDetailsListByStockId() {
    this.stockService.getNilonDetailsByStockId(this.stockId).subscribe((data) => {
      data.forEach((el) => {
        this.allNilonDetailsList.push(el);
      })
    })
  }

  getTobaccoLeavesByStockId() {
    this.stockService.getTobaccoLeavesByStockId(this.stockId).subscribe((data) => {
      data.forEach((el) => {
        this.allTobaccoLeavesList.push(el);
      })
    })
  }

  getWrappingLeavesByStockId() {
    this.stockService.getWrappingLeavesByStockId(this.stockId).subscribe((data) => {
      data.forEach((el) => {
        this.allWrappingLeavesList.push(el);
      })
    })
  }

  createAddChemicalDetailsForm() {
    this.addChemicalDetailsForm = this.formBuilder.group({
      chemicalName: ['', Validators.required],
      chemicalType: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      stock_id: ['', Validators.required]
    })
  }

  onSubmitAddChemicalDetailsForm() {
    this.chemicalDetails.chemicalName = this.addChemicalDetailsForm.controls['chemicalName'].value;
    this.chemicalDetails.chemicalType = this.addChemicalDetailsForm.controls['chemicalType'].value;
    this.chemicalDetails.date = this.addChemicalDetailsForm.controls['date'].value;
    this.chemicalDetails.price = this.addChemicalDetailsForm.controls['price'].value;
    this.chemicalDetails.quantity = this.addChemicalDetailsForm.controls['quantity'].value;
    this.chemicalDetails.stock_id = this.stockId;

    this.stockService.addNewChemicalDetailsForStock(this.chemicalDetails).subscribe((data) => {
      this.notify.success("New Chemical Details Added Successfully");
    }, (err) => {
      this.notify.error("There is an Error Occured " + err);
    })
  }

  createAddnewNilonDetailsForm() {
    this.addNilonDetailsForm = this.formBuilder.group({
      nilonType: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      stock_id: ['', Validators.required]
    })
  }

  onSubmitAddNilonDetailsForm() {
    this.nilonDetails.nilonType = this.addNilonDetailsForm.controls['nilonType'].value;
    this.nilonDetails.date = this.addNilonDetailsForm.controls['date'].value;
    this.nilonDetails.price = this.addNilonDetailsForm.controls['price'].value;
    this.nilonDetails.quantity = this.addNilonDetailsForm.controls['quantity'].value;
    this.nilonDetails.stock_id = this.stockId;

    this.stockService.addNewNilonDetailsForStock(this.nilonDetails).subscribe((data) => {
      this.notify.success("New Nilopn details Added Suvvessfully.");
    }, (err) => {
      this.notify.error("There is an Error Occur " + err)
    })
  }

  createAddNewTobaccoLeavesForm() {
    this.addTobaccoLeavesForm = this.formBuilder.group({
      tobaccoType: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['' , Validators.required],
      stock_id: ['', Validators.required]
    })
  }

  onSubmitAddTobaccoLeavesForm() {
    this.tobaccoLeavesDetails.tobaccoType = this.addTobaccoLeavesForm.controls['tobaccoType'].value;
    this.tobaccoLeavesDetails.date = this.addTobaccoLeavesForm.controls['date'].value;
    this.tobaccoLeavesDetails.quantity = this.addTobaccoLeavesForm.controls['quantity'].value;
    this.tobaccoLeavesDetails.price = this.addTobaccoLeavesForm.controls['price'].value;
    this.tobaccoLeavesDetails.stock_id = this.stockId;

    this.stockService.addNewTobaccoDetailsForStock(this.tobaccoLeavesDetails).subscribe((data) => {
      this.notify.success("New Tobacco Details Added Successfully.");
    },(err) => {
      this.notify.error("There is an Error Occur " + err);
    })
  }

  createAddWrappingLeavesForm() {
    this.addWrappingLeavesForm = this.formBuilder.group({
      leaveType: ['', Validators.required],
      quantity: ['', Validators.required],
      unitPrice: ['', Validators.required],
      createdDate: ['', Validators.required],
      stock_id: ['', Validators.required]
    })
  }

  onClickAddWrappingLeavesForStock() {
    this.wrappingLeavesDetails.leaveType = this.addWrappingLeavesForm.controls['leaveType'].value;
    this.wrappingLeavesDetails.createdDate = this.addWrappingLeavesForm.controls['createdDate'].value;
    this.wrappingLeavesDetails.quantity = this.addWrappingLeavesForm.controls['quantity'].value;
    this.wrappingLeavesDetails.unitPrice = this.addWrappingLeavesForm.controls['unitPrice'].value;
    this.wrappingLeavesDetails.stock_id = this.stockId;

    this.stockService.addWrappingLeavesDetailsForStock(this.wrappingLeavesDetails).subscribe((data) => {
      
    },(err) => {

    })
  }

  getStockItemQuantities() {
    this.stockService.getWrappingLeavesSockQuantity(this.stockId).subscribe((data) => {
      this.wrappingLeavesQuantity = data
    },(err) => {
      console.log(err);
    })

    this.stockService.getTobaccoLeavesStockQuantity(this.stockId).subscribe((data) => {
      this.tobaccoLeavesQuantity = data
    })

    this.stockService.getNilonDetailsQuantity(this.stockId).subscribe((data) => {
      this.nilonDetailsQuantity = data
    })

    this.stockService.getChemicalDetailsQuantity(this.stockId).subscribe((data) => {
      this.chemicalDetailsQuantity = data
    })
  }



  onClickBackToStockPage() {
	  this.router.navigate(['app/admin/stock-management']);
  }

}
