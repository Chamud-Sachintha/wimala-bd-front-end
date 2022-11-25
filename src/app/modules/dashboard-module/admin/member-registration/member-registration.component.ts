import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Agent } from 'src/app/models/Agent';
import { LabelEmployee } from 'src/app/models/LabelEmployee';
import { MainBranch } from 'src/app/models/MainBranch';
import { RegistrationServiceService } from 'src/app/services/registration-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEntityComponent } from '../../dialogs/update-entity/update-entity.component';
import { PackagingEmployee } from 'src/app/models/PackagingEmployee';
import { Shop } from 'src/app/models/Shop';
import { TransportEmployee } from 'src/app/models/TransportEmployee';

@Component({
	selector: 'app-member-registration',
	templateUrl: './member-registration.component.html',
	styleUrls: ['./member-registration.component.css']
})

export class MemberRegistrationComponent implements OnInit {

	mainBranchDetails = new MainBranch();
	agentDetails = new Agent();
	labelEmployee = new LabelEmployee();
	packagingEmployee = new PackagingEmployee();
	transportEmployee = new TransportEmployee();
	shopDetails = new Shop();
	addNewMainBranchForm!: FormGroup;
	addAgentDetailsForm!: FormGroup;
	addLablingEmployeeForm!: FormGroup;
	addPackagingEmployeeForm!: FormGroup;
	addShopDetailsForm!: FormGroup;
	addTransportEmployeeDetailsForm!: FormGroup;
	allMainBranchesList: any[] = [];
	allAgentList: any[] = [];
	active = 1;

	constructor(private formBuilder: FormBuilder, private registrationService: RegistrationServiceService
		, private notify: ToastrService, public dialog: MatDialog) {
	}

	ngOnInit(): void {
		this.createAddMainBranchForm();
		this.createAddAgentForm();
		this.createAddLablingEmployeeForm();
		this.createAddPackagingEmployeeForm();
		this.createAddShopDetailsForm();
		this.addTransportEmployeeForm();

		this.getAllMainBranchList();
		this.getAllAgentList();
	}

	getAllAgentList() {
		this.registrationService.getAllAgentList().subscribe((resp) => {
			resp.forEach((el) => {
				this.allAgentList.push(el);
			})
		})
	}

	getAllMainBranchList() {
		this.registrationService.getAllMainBranches().subscribe((resp) => {
			resp.forEach((el) => {
				this.allMainBranchesList.push(el);
			})
		});
	}

	openMainBranchUpdateDialog() {
		this.dialog.open(UpdateEntityComponent, {
			data: {
				isMainBranch: true,
				isAgent: false,
			},
			width: '600px'
		});
	}

	openAgenthUpdateDialog() {
		this.dialog.open(UpdateEntityComponent, {
			data: {
				isMainBranch: false,
				isAgent: true,
			},
			width: '600px'
		});
	}

	createAddPackagingEmployeeForm() {
		this.addPackagingEmployeeForm = this.formBuilder.group({
			packagingEmpRefNo: ['', Validators.required],
			packagingEmpName: ['', Validators.required],
			packagingEmpAddress: ['', Validators.required],
			packagingEmpNicNo: ['',Validators.required],
			packagingEmpContactNo: ['', Validators.required]
		})
	}

	onSubmitAddPackagingEmployeeForm() {
		this.packagingEmployee.packagingEmpRefNo = this.addPackagingEmployeeForm.controls['packagingEmpRefNo'].value;
		this.packagingEmployee.packagingEmpName = this.addPackagingEmployeeForm.controls['packagingEmpName'].value;
		this.packagingEmployee.packagingEmpNicNo = this.addPackagingEmployeeForm.controls['packagingEmpNicNo'].value;
		this.packagingEmployee.packagingEmpAddress = this.addPackagingEmployeeForm.controls['packagingEmpAddress'].value;
		this.packagingEmployee.packagingEmpContactNo = this.addPackagingEmployeeForm.controls['packagingEmpContactNo'].value;

		this.registrationService.addNewPackagingEmployee(this.packagingEmployee).subscribe((resp) => {
			this.notify.success("New Packaging Employee Added Successfully.");
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

	createAddShopDetailsForm() {
		this.addShopDetailsForm = this.formBuilder.group({
			shopOwnerNicNo: ['', Validators.required],
			shopOwnerName: ['', Validators.required],
			shopLocation: ['', Validators.required],
			shopMobileNo: ['', Validators.required]
		})
	}

	onSubmitAddNewShopDetailsForm() {
		this.shopDetails.shopOwnerNicNo = this.addShopDetailsForm.controls['shopOwnerNicNo'].value;
		this.shopDetails.shopOwnerName = this.addShopDetailsForm.controls['shopOwnerName'].value;
		this.shopDetails.shopLocation = this.addShopDetailsForm.controls['shopLocation'].value;
		this.shopDetails.shopMobileNo = this.addShopDetailsForm.controls['shopMobileNo'].value;

		this.registrationService.addNewShopDetails(this.shopDetails).subscribe((resp) => {
			this.notify.success("New Shop Added Successfully.");
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

	addTransportEmployeeForm() {
		this.addTransportEmployeeDetailsForm = this.formBuilder.group({
			transportEmpNicNo: ['', Validators.required],
			transportEmpName: ['', Validators.required],
			transportEmpMobile: ['', Validators.required]
		})
	}

	onSubmitTransportEmployeeDetailsForm() {
		this.transportEmployee.transportEmpNicNo = this.addTransportEmployeeDetailsForm.controls['transportEmpNicNo'].value;
		this.transportEmployee.transportEmpName = this.addTransportEmployeeDetailsForm.controls['transportEmpName'].value;
		this.transportEmployee.transportEmpMobile = this.addTransportEmployeeDetailsForm.controls['transportEmpMobile'].value;
		
		this.registrationService.addNewTransportEmployee(this.transportEmployee).subscribe((resp) => {
			this.notify.success("New Transport Employee Added Successfully.");
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

	createAddMainBranchForm() {
		this.addNewMainBranchForm = this.formBuilder.group({
			employeeName: ['', Validators.required],
			employeeAddress: ['', Validators.required],
			employeeNicNo: ['', Validators.required],
			employeeRefNo: ['', Validators.required]
		});
	}

	createAddAgentForm() {
		this.addAgentDetailsForm = this.formBuilder.group({
			agentRefNo: ['', Validators.required],
			agentname: ['', Validators.required],
			agentNicNumber: ['', Validators.required],
			agentLocation: ['', Validators.required]
		});
	}

	createAddLablingEmployeeForm() {
		this.addLablingEmployeeForm = this.formBuilder.group({
			labelEmpRefNo: ['', Validators.required],
			labelEmpNicNumber: ['', Validators.required],
			labelEmployeeName: ['', Validators.required],
			labelEmpContactNo: ['', Validators.required],
			labelEmpAddress: ['', Validators.required]
		})
	}

	onSubmitAddLablingEmployeeDetailsForm() {
		this.labelEmployee.labelEmployeeName = this.addLablingEmployeeForm.controls['labelEmployeeName'].value;
		this.labelEmployee.labelEmpNicNumber = this.addLablingEmployeeForm.controls['labelEmpNicNumber'].value;
		this.labelEmployee.labelEmpContactNo = this.addLablingEmployeeForm.controls['labelEmpContactNo'].value;
		this.labelEmployee.labelEmpAddress = this.addLablingEmployeeForm.controls['labelEmpAddress'].value;
		this.labelEmployee.labelEmpRefNo = this.addLablingEmployeeForm.controls['labelEmpRefNo'].value;

		this.registrationService.addNewLabelEmployee(this.labelEmployee).subscribe((resp) => {
			this.notify.success("New Label Employee Added Successfully.");
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

	onSubmitAddAgentDetailsForm() {
		this.agentDetails.agentRefNo = this.addAgentDetailsForm.controls['agentRefNo'].value;
		this.agentDetails.agentname = this.addAgentDetailsForm.controls['agentname'].value;
		this.agentDetails.agentNicNumber = this.addAgentDetailsForm.controls['agentNicNumber'].value;
		this.agentDetails.agentLocation = this.addAgentDetailsForm.controls['agentLocation'].value;

		this.registrationService.addNewAgentDetails(this.agentDetails).subscribe((resp) => {
			this.notify.success("New Agent Added Successfully.");
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

	onSubmitAddMainBranchForm() {
		this.mainBranchDetails.branchEmployeeName = this.addNewMainBranchForm.controls['employeeName'].value;
		this.mainBranchDetails.branchEmployeeAddress = this.addNewMainBranchForm.controls['employeeAddress'].value;
		this.mainBranchDetails.branchEmployeeNicNumber = this.addNewMainBranchForm.controls['employeeNicNo'].value;
		this.mainBranchDetails.branchRefNo = this.addNewMainBranchForm.controls['employeeRefNo'].value;

		this.registrationService.addNewBranchDetails(this.mainBranchDetails).subscribe((resp) => {
			this.notify.success("Main Branch Added Successfully.");
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
}
