import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agent } from '../models/Agent';
import { LabelEmployee } from '../models/LabelEmployee';
import { MainBranch } from '../models/MainBranch';
import { PackagingEmployee } from '../models/PackagingEmployee';
import { Shop } from '../models/Shop';
import { TransportEmployee } from '../models/TransportEmployee';

@Injectable({
  providedIn: 'root'
})
export class ManageEntityService {

  constructor(private http: HttpClient) { }

  updateMainBranchDetails(branchRefNo: string,mainBranchDetails: MainBranch) {
    const path = "http://localhost:8080/manage/updateMainBranch?" + "branchRefNo=" + branchRefNo;
    return this.http.put(path, mainBranchDetails);
  }

  updateAgentDetailsById(agentRefNo: string, agentDetails: Agent) {
    const path = "http://localhost:8080/manage/updateAgent?" + "agentRefNo=" + agentRefNo;
    return this.http.put(path, agentDetails);
  }

  updateLablingEmployeedetailsById(labelEmployeeRefNo:string, lablingEmployeeDetails: LabelEmployee) {
    const path = "http://localhost:8080/manage/updateLablingEmployee?" + "refNo=" + labelEmployeeRefNo;
    return this.http.put(path, lablingEmployeeDetails);
  }

  updatePackagingEmployeeDetailsById(emprefNo: string, packagingEmployeeDetails: PackagingEmployee) {
    const path = "http://localhost:8080/manage/updatePackagingEmployee?" + "refNo=" + emprefNo;
    return this.http.put(path, packagingEmployeeDetails);
  }

  updateShopdetailsById(shopOwnerNicId: string, newShopDetails: Shop) {
    const path = "http://localhost:8080/manage/updateShopDetails?" + "shopNic=" + shopOwnerNicId;
    return this.http.put(path, newShopDetails);
  }

  updateTransportEmployeeByRefNo(empRefNo: string, transportEmployeeDetails: TransportEmployee) {
    const path = "http://localhost:8080/manage/updateTransportEmployee?" + "refNo=" + empRefNo;
    return this.http.put(path, transportEmployeeDetails);
  }
}
