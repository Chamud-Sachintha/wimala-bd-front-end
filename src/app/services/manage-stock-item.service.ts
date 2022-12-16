import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChemicalDetails } from '../models/ChemicalDetails';
import { NilonDetails } from '../models/NilonDetails';
import { TobaccoLeaves } from '../models/TobaccoLeaves';
import { WrappingLeaves } from '../models/WrappingLeaves';

@Injectable({
  providedIn: 'root'
})
export class ManageStockItemService {

  constructor(private http: HttpClient) { }

  updateWrappingLeavesByRefNoAndStockId(refNo: string, stockId: string, wrappingLeavesDetails: WrappingLeaves) {
    const path = "http://localhost:8080/stockItems/manage/wrappingLeaves?" + "refNo=" + refNo + "&stockId=" + stockId;
    return this.http.put(path, wrappingLeavesDetails);
  }

  updateTobaccoLeavesByRefNoAndStockId(refNo: string, stockId: string ,tobaccoLeavesDetails: TobaccoLeaves) {
    const path = "http://localhost:8080/stockItems/manage/tobaccoLeaves?" + "refNo=" + refNo + "&stockId=" + stockId;
    return this.http.put(path, tobaccoLeavesDetails);
  }

  updateNilondetailsByRefNoAndStockId(refNo: string, stockId: string, nilonDetails: NilonDetails) {
    const path = "http://localhost:8080/stockItems/manage/nilonDetails?" + "refNo=" + refNo + "&stockId=" + stockId;
    return this.http.put(path, nilonDetails);
  }

  updateChemicalDetailsByRefNoAndStockid(refNo: string, stockId: string, chemicalDetails: ChemicalDetails) {
    const path = "http://localhost:8080/stockItems/manage/chemicalDetails?" + "refNo=" + refNo + "&stockId=" + stockId;
    return this.http.put(path, chemicalDetails);
  }

  deleteWrappingLeavesByRefNoAnd(refNo: string, stockId: string) {
    const path = "http://localhost:8080/stockItems/delete/wrappingLeaves?" + "refNo=" + refNo + "&stockId=" + stockId;
    return this.http.delete(path);
  }

  deleteTobaccoLeavesByRefNoAndStockId(refNo: string, stockId: string) {
    const path = "http://localhost:8080/stockItems/delete/tobaccoLeaves?" + "refNo=" + refNo + "&stockId=" + stockId;
    return this.http.delete(path);
  }

  deleteNilonDetailsByRefNoAndStockId(refNo: string, stockId: string) {
    const path = "http://localhost:8080/stockItems/delete/nilonDetails?" + "refNo=" + refNo + "&stockId=" + stockId;
    return this.http.delete(path);
  }

  deleteChemicalDetailsByRefNoAndStockId(refNo: string, stockId: string) {
    const path = "http0://localhost:8080/stockItems/delete/chemicalDetails?" + "refNo=" + refNo + "&stockId=" + stockId;
    return this.http.delete(path);
  }
}
