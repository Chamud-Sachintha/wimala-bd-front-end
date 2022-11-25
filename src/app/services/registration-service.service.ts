import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agent } from '../models/Agent';
import { LabelEmployee } from '../models/LabelEmployee';
import { MainBranch } from '../models/MainBranch';
import { Observable } from 'rxjs';
import { PackagingEmployee } from '../models/PackagingEmployee';
import { Shop } from '../models/Shop';
import { TransportEmployee } from '../models/TransportEmployee';

@Injectable({
  providedIn: 'root'
})
export class RegistrationServiceService {

  constructor(private http: HttpClient) { }

  addNewBranchDetails(newBranchDetails: MainBranch) {
    const path = "http://localhost:8080/reg/addNewBranch";
    return this.http.post(path, newBranchDetails);
  }

  addNewAgentDetails(agentDetails: Agent) {
    const path = "http://localhost:8080/reg/addNewAgent";
    return this.http.post(path, agentDetails);
  }

  addNewLabelEmployee(labelEmployee: LabelEmployee) {
    const path = "http://localhost:8080/reg/addNewLablingEmployee";
    return this.http.post(path, labelEmployee);
  }

  addNewPackagingEmployee(packagingEmployee: PackagingEmployee) {
    const path = "http://localhost:8080/reg/addNewPackagingEmployee";
    return this.http.post(path, packagingEmployee);
  }

  addNewShopDetails(shopdetails: Shop) {
    const path = "http://localhost:8080/reg/addNewShop";
    return this.http.post(path, shopdetails);
  }

  addNewTransportEmployee(transportEmployee: TransportEmployee) {
    const path = "http://localhost:8080/reg/addNewTransportEmployee";
    return this.http.post(path, transportEmployee);
  }

  getAllMainBranches():Observable<any[]> {
    const path = "http://localhost:8080/get/allMainBranhesList";
    return this.http.get<any[]>(path);
  }

  getAllAgentList():Observable<any[]> {
    const path = "http://localhost:8080/get/allAgentList";
    return this.http.get<any[]>(path);
  }
}
