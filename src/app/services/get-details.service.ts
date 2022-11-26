import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agent } from '../models/Agent';
import { LabelEmployee } from '../models/LabelEmployee';
import { MainBranch } from '../models/MainBranch';
import { PackagingEmployee } from '../models/PackagingEmployee';
import { Shop } from '../models/Shop';
import { TransportEmployee } from '../models/TransportEmployee';

@Injectable({
  providedIn: 'root'
})
export class GetDetailsService {

  constructor(private http: HttpClient) { }

  getMainBranchesDetailsByBranchRefNo(branchRefNo: string):Observable<MainBranch> {
    const path = "http://localhost:8080/get/getMainBranDetailById?" + "branchRefNo=" + branchRefNo;
    return this.http.get<MainBranch>(path);
  }

  getAgentdetailsByRefNo(agentRefNo: String):Observable<Agent> {
    const path = "http://localhost:8080/get/getAgentDetailsById?" + "agentRefNo=" + agentRefNo;
    return this.http.get<Agent>(path);
  }

  getLablingEmployeeDetailsByRefNo(empRefNo: string):Observable<LabelEmployee> {
    const path = "http://localhost:8080/get/getLablingEmployeeDetailsById?" + "empRefNo=" + empRefNo;
    return this.http.get<LabelEmployee>(path);
  }

  getPackagingEmployeeDetailsByRefNo(emprefNo:string):Observable<PackagingEmployee> {
    const path = "http://localhost:8080/get/getPackagingEmployeeDetailsById?" + "empRefNo=" + emprefNo;
    return this.http.get<PackagingEmployee>(path);
  }

  getShopDetailsByShopOwnerNic(shopOwnerNic: string):Observable<Shop> {
    const path = "http://localhost:8080/get/getShopdetailsById?" + "shopOwnerNic=" + shopOwnerNic;
    return this.http.get<Shop>(path);
  }

  getTransportEmployeeDetailsByRefNo(empRefNo:string):Observable<TransportEmployee> {
    const path = "http://localhost:8080/get/getTransportEmployeeDetailsById?" + "empRefNo=" + empRefNo;
    return this.http.get<TransportEmployee>(path);
  }
}
