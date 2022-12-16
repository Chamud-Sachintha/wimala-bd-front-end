import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Agent } from 'src/app/models/Agent';
import { LabelEmployee } from 'src/app/models/LabelEmployee';
import { MainBranch } from 'src/app/models/MainBranch';
import { PackagingEmployee } from 'src/app/models/PackagingEmployee';
import { Shop } from 'src/app/models/Shop';
import { TransportEmployee } from 'src/app/models/TransportEmployee';
import { GetDetailsService } from 'src/app/services/get-details.service';
import { ManageEntityService } from 'src/app/services/manage-entity.service';

@Component({
  selector: 'app-update-entity',
  templateUrl: './update-entity.component.html',
  styleUrls: ['./update-entity.component.css']
})
export class UpdateEntityComponent implements OnInit {

  refNo!: string;
  updateMainBranchForm!: FormGroup;
  updateAgentdetailsForm!: FormGroup;
  updateLablingEmployeeForm!: FormGroup;
  updatePackagingEmployeeForm!: FormGroup;
  updateShopDetailsForm!: FormGroup;
  updateTransportEmployeeForm!: FormGroup;
  selectedMainBranchDetails: any[] = [];
  mainBranch = new MainBranch();
  agentDetails = new Agent();
  labelEmployee = new LabelEmployee();
  lineDetails = new Shop();
  transportEmployee = new TransportEmployee();
  packagingEmployee = new PackagingEmployee();
  constructor(public dialogRef: MatDialogRef<UpdateEntityComponent>, @Inject(MAT_DIALOG_DATA) public mydata: any
    , private getDetailsService: GetDetailsService, private formBuilder: FormBuilder, private manageEntity: ManageEntityService,
    private notify: ToastrService) { }

  ngOnInit(): void {
    this.refNo = this.mydata.refNo;

    if (this.mydata.isMainBranch) {
      this.createUpdateMainBranchDetailsForm();
      this.getMainBranchDetailByRefNo();
    } else if (this.mydata.isAgent) {
      this.createdUpdateAgentForm();
      this.getselectedAgentDetailsByRefNo();
    } else if (this.mydata.isLableEmployee) {
      this.createUpdateLablingEmployeeForm();
      this.getselectedLablingEmployeeDetailsByRefNo();
    } else if (this.mydata.isPackagingEmployee) {
      this.createUpdatePackagingEmployeeForm();
      this.getselectedPackagingEmployeeDetailsByRefNo();
    } else if (this.mydata.isLine) {
      this.createUpdateShopDetailsForm();
      this.getselectedShopDetailsByRefNo();
    } else if (this.mydata.isTransportEmployee) {
      this.createUpdateTransportEmployeeDetailsForm();
      this.getselectedTransportEmployeeDetailsByRefNo();
    }
  }

  createUpdateTransportEmployeeDetailsForm() {
    this.updateTransportEmployeeForm = this.formBuilder.group({
			transportEmpNicNo: ['', Validators.required],
			transportEmpName: ['', Validators.required],
			transportEmpMobile: ['', Validators.required]
		})
  }

  getselectedTransportEmployeeDetailsByRefNo() {
    this.getDetailsService.getTransportEmployeeDetailsByRefNo(this.refNo).subscribe((resp: TransportEmployee) => {
      this.transportEmployee.transportEmpName = resp.transportEmpName;
      this.transportEmployee.transportEmpNicNo = resp.transportEmpNicNo;
      this.transportEmployee.transportEmpMobile = resp.transportEmpMobile;

      this.updateTransportEmployeeForm.controls['transportEmpNicNo'].setValue(this.transportEmployee.transportEmpNicNo);
      this.updateTransportEmployeeForm.controls['transportEmpName'].setValue(this.transportEmployee.transportEmpName);
      this.updateTransportEmployeeForm.controls['transportEmpMobile'].setValue(this.transportEmployee.transportEmpMobile);
    })
  }

  onSubmitTransportEmployeeUpdateForm() {
    this.transportEmployee.transportEmpNicNo = this.updateTransportEmployeeForm.controls['transportEmpNicNo'].value;
		this.transportEmployee.transportEmpName = this.updateTransportEmployeeForm.controls['transportEmpName'].value;
		this.transportEmployee.transportEmpMobile = this.updateTransportEmployeeForm.controls['transportEmpMobile'].value;
		
		this.manageEntity.updateTransportEmployeeByRefNo(this.refNo, this.transportEmployee).subscribe((resp) => {
			this.notify.success("New Transport Employee Updated Successfully.");
      this.dialogRef.close()
		},
			(err) => {
				if (err.status === 401) {
					console.log("JWT is Expired.");
				} else if (err.status === 500) {
					this.notify.error("There is Error Occured " + err.message);
				} else {
					this.notify.error("There is Error Occured " + err.message);
				}
			})
  }

  createUpdateShopDetailsForm() {
    this.updateShopDetailsForm = this.formBuilder.group({
			shopOwnerNicNo: ['', Validators.required],
			shopOwnerName: ['', Validators.required],
			shopLocation: ['', Validators.required],
			shopMobileNo: ['', Validators.required]
		})
  }

  getselectedShopDetailsByRefNo() {
    this.getDetailsService.getShopDetailsByShopOwnerNic(this.refNo).subscribe((resp: Shop) => {
      this.lineDetails.shopOwnerName = resp.shopOwnerName;
      this.lineDetails.shopOwnerNicNo = resp.shopOwnerNicNo;
      this.lineDetails.shopLocation = resp.shopLocation;
      this.lineDetails.shopMobileNo = resp.shopMobileNo;

      this.updateShopDetailsForm.controls['shopOwnerName'].setValue(this.lineDetails.shopOwnerName);
      this.updateShopDetailsForm.controls['shopOwnerNicNo'].setValue(this.lineDetails.shopOwnerNicNo);
      this.updateShopDetailsForm.controls['shopLocation'].setValue(this.lineDetails.shopLocation);
      this.updateShopDetailsForm.controls['shopMobileNo'].setValue(this.lineDetails.shopMobileNo);
    })
  }

  onSubmitShopDetailsUpdateForm() {
    this.lineDetails.shopOwnerNicNo = this.updateShopDetailsForm.controls['shopOwnerNicNo'].value;
		this.lineDetails.shopOwnerName = this.updateShopDetailsForm.controls['shopOwnerName'].value;
		this.lineDetails.shopLocation = this.updateShopDetailsForm.controls['shopLocation'].value;
		this.lineDetails.shopMobileNo = this.updateShopDetailsForm.controls['shopMobileNo'].value;

		this.manageEntity.updateShopdetailsById(this.refNo, this.lineDetails).subscribe((resp) => {
			this.notify.success("New Shop Updated Successfully.");
      this.dialogRef.close()
		},
			(err) => {
				if (err.status === 401) {
					console.log("JWT is Expired.");
				} else if (err.status === 500) {
					this.notify.error("There is Error Occured " + err.message);
				} else {
					this.notify.error("There is Error Occured " + err.message);
				}
			})
  }

  createUpdatePackagingEmployeeForm() {
    this.updatePackagingEmployeeForm = this.formBuilder.group({
			packagingEmpRefNo: ['', Validators.required],
			packagingEmpName: ['', Validators.required],
			packagingEmpAddress: ['', Validators.required],
			packagingEmpNicNo: ['',Validators.required],
			packagingEmpContactNo: ['', Validators.required]
		})
  }

  getselectedPackagingEmployeeDetailsByRefNo() {
    this.getDetailsService.getPackagingEmployeeDetailsByRefNo(this.refNo).subscribe((resp: PackagingEmployee) => {
      this.packagingEmployee.packagingEmpName = resp.packagingEmpName;
      this.packagingEmployee.packagingEmpAddress = resp.packagingEmpAddress;
      this.packagingEmployee.packagingEmpNicNo = resp.packagingEmpNicNo;
      this.packagingEmployee.packagingEmpContactNo = resp.packagingEmpContactNo;
      this.packagingEmployee.packagingEmpRefNo = resp.packagingEmpRefNo;

      this.updatePackagingEmployeeForm.controls['packagingEmpName'].setValue(this.packagingEmployee.packagingEmpName);
      this.updatePackagingEmployeeForm.controls['packagingEmpAddress'].setValue(this.packagingEmployee.packagingEmpAddress);
      this.updatePackagingEmployeeForm.controls['packagingEmpNicNo'].setValue(this.packagingEmployee.packagingEmpNicNo);
      this.updatePackagingEmployeeForm.controls['packagingEmpContactNo'].setValue(this.packagingEmployee.packagingEmpContactNo);
      this.updatePackagingEmployeeForm.controls['packagingEmpRefNo'].setValue(this.packagingEmployee.packagingEmpRefNo);
    })
  }

  onSubmitPackagingEmployeeUpdateForm() {
    this.packagingEmployee.packagingEmpRefNo = this.updatePackagingEmployeeForm.controls['packagingEmpRefNo'].value;
		this.packagingEmployee.packagingEmpName = this.updatePackagingEmployeeForm.controls['packagingEmpName'].value;
		this.packagingEmployee.packagingEmpNicNo = this.updatePackagingEmployeeForm.controls['packagingEmpNicNo'].value;
		this.packagingEmployee.packagingEmpAddress = this.updatePackagingEmployeeForm.controls['packagingEmpAddress'].value;
		this.packagingEmployee.packagingEmpContactNo = this.updatePackagingEmployeeForm.controls['packagingEmpContactNo'].value;

		this.manageEntity.updatePackagingEmployeeDetailsById(this.refNo, this.packagingEmployee).subscribe((resp) => {
			this.notify.success("New Packaging Employee Updated Successfully.");
      this.dialogRef.close()
		},
			(err) => {
				if (err.status === 401) {
					console.log("JWT is Expired.");
				} else if (err.status === 500) {
					this.notify.error("There is Error Occured " + err.message);
				} else {
					this.notify.error("There is Error Occured " + err.message);
				}
			})
  }

  createUpdateLablingEmployeeForm() {
    this.updateLablingEmployeeForm = this.formBuilder.group({
			labelEmpRefNo: ['', Validators.required],
			labelEmpNicNumber: ['', Validators.required],
			labelEmployeeName: ['', Validators.required],
			labelEmpContactNo: ['', Validators.required],
			labelEmpAddress: ['', Validators.required]
		})
  }

  onSubmitLablingEmployeeUpdateForm() {
    this.labelEmployee.labelEmployeeName = this.updateLablingEmployeeForm.controls['labelEmployeeName'].value;
		this.labelEmployee.labelEmpNicNumber = this.updateLablingEmployeeForm.controls['labelEmpNicNumber'].value;
		this.labelEmployee.labelEmpContactNo = this.updateLablingEmployeeForm.controls['labelEmpContactNo'].value;
		this.labelEmployee.labelEmpAddress = this.updateLablingEmployeeForm.controls['labelEmpAddress'].value;
		this.labelEmployee.labelEmpRefNo = this.updateLablingEmployeeForm.controls['labelEmpRefNo'].value;

		this.manageEntity.updateLablingEmployeedetailsById(this.refNo, this.labelEmployee).subscribe((resp) => {
			this.notify.success("New Label Employee Updated Successfully.");
      this.dialogRef.close()
		},
			(err) => {
				if (err.status === 401) {
					console.log("JWT is Expired.");
				} else if (err.status === 500) {
					this.notify.error("There is Error Occured " + err.message);
				} else {
					this.notify.error("There is Error Occured " + err.message);
				}
			})
  }

  onSubmitAgentDetailsUpdateForm() {
    this.agentDetails.agentRefNo = this.updateAgentdetailsForm.controls['agentRefNo'].value;
		this.agentDetails.agentname = this.updateAgentdetailsForm.controls['agentname'].value;
		this.agentDetails.agentNicNumber = this.updateAgentdetailsForm.controls['agentNicNumber'].value;
		this.agentDetails.agentLocation = this.updateAgentdetailsForm.controls['agentLocation'].value;

		this.manageEntity.updateAgentDetailsById(this.refNo, this.agentDetails).subscribe((resp) => {
			this.notify.success("New Agent Updated Successfully.");
      this.dialogRef.close()
		},
			(err) => {
				if (err.status === 401) {
					console.log("JWT is Expired.");
				} else if (err.status === 500) {
					this.notify.error("There is Error Occured " + err.message);
				} else {
					this.notify.error("There is Error Occured " + err.message);
				}
			})
  }

  getselectedLablingEmployeeDetailsByRefNo() {
    this.getDetailsService.getLablingEmployeeDetailsByRefNo(this.refNo).subscribe((resp: LabelEmployee) => {
      this.labelEmployee.labelEmployeeName = resp.labelEmployeeName;
      this.labelEmployee.labelEmpAddress = resp.labelEmpAddress;
      this.labelEmployee.labelEmpContactNo = resp.labelEmpContactNo;
      this.labelEmployee.labelEmpNicNumber = resp.labelEmpNicNumber;
      this.labelEmployee.labelEmpRefNo = resp.labelEmpRefNo;

      this.updateLablingEmployeeForm.controls['labelEmployeeName'].setValue(this.labelEmployee.labelEmployeeName);
      this.updateLablingEmployeeForm.controls['labelEmpAddress'].setValue(this.labelEmployee.labelEmpAddress)
      this.updateLablingEmployeeForm.controls['labelEmpContactNo'].setValue(this.labelEmployee.labelEmpContactNo)
      this.updateLablingEmployeeForm.controls['labelEmpNicNumber'].setValue(this.labelEmployee.labelEmpNicNumber)
      this.updateLablingEmployeeForm.controls['labelEmpRefNo'].setValue(this.labelEmployee.labelEmpRefNo)
    })
  }

  createdUpdateAgentForm() {
    this.updateAgentdetailsForm = this.formBuilder.group({
      agentRefNo: ['', Validators.required],
      agentname: ['', Validators.required],
      agentNicNumber: ['', Validators.required],
      agentLocation: ['', Validators.required]
    });
  }

  getselectedAgentDetailsByRefNo() {
    this.getDetailsService.getAgentdetailsByRefNo(this.refNo).subscribe((resp: Agent) => {
      this.agentDetails.agentname = resp.agentname;
      this.agentDetails.agentRefNo = resp.agentRefNo;
      this.agentDetails.agentNicNumber = resp.agentNicNumber;
      this.agentDetails.agentLocation = resp.agentLocation;

      this.updateAgentdetailsForm.controls['agentRefNo'].setValue(this.agentDetails.agentRefNo);
      this.updateAgentdetailsForm.controls['agentname'].setValue(this.agentDetails.agentname);
      this.updateAgentdetailsForm.controls['agentNicNumber'].setValue(this.agentDetails.agentNicNumber);
      this.updateAgentdetailsForm.controls['agentLocation'].setValue(this.agentDetails.agentLocation);
    })
  }

  onSubmitUpdateForm() {
    this.mainBranch.branchEmployeeName = this.updateMainBranchForm.controls['employeeName'].value;
    this.mainBranch.branchEmployeeAddress = this.updateMainBranchForm.controls['employeeAddress'].value;
    this.mainBranch.branchEmployeeNicNumber = this.updateMainBranchForm.controls['employeeNicNo'].value;
    this.mainBranch.branchRefNo = this.updateMainBranchForm.controls['employeeRefNo'].value;

    this.manageEntity.updateMainBranchDetails(this.refNo, this.mainBranch).subscribe((resp) => {
      this.notify.success("Main Branch Updated Successfully.");
      this.dialogRef.close()
    },
      (err) => {
        if (err.status === 401) {
          console.log("JWT is Expired.");
        } else if (err.status === 500) {
          this.notify.error("There is Error Occured " + err.message);
        } else {
          this.notify.error("There is Error Occured " + err.message);
        }
      })
  }

  createUpdateMainBranchDetailsForm() {
    this.updateMainBranchForm = this.formBuilder.group({
      employeeName: ['', Validators.required],
      employeeAddress: ['', Validators.required],
      employeeNicNo: ['', Validators.required],
      employeeRefNo: ['', Validators.required]
    })
  }

  getMainBranchDetailByRefNo() {
    this.getDetailsService.getMainBranchesDetailsByBranchRefNo(this.refNo).subscribe((resp: MainBranch) => {
      this.mainBranch.branchEmployeeName = resp.branchEmployeeName;
      this.mainBranch.branchEmployeeNicNumber = resp.branchEmployeeNicNumber;
      this.mainBranch.branchEmployeeAddress = resp.branchEmployeeAddress;
      this.mainBranch.branchRefNo = resp.branchRefNo;

      this.updateMainBranchForm.controls['employeeName'].setValue(resp.branchEmployeeName);
      this.updateMainBranchForm.controls['employeeNicNo'].setValue(resp.branchEmployeeNicNumber);
      this.updateMainBranchForm.controls['employeeAddress'].setValue(resp.branchEmployeeAddress);
      this.updateMainBranchForm.controls['employeeRefNo'].setValue(resp.branchRefNo);
    })
  }

}
