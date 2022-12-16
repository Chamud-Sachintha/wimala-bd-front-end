import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChemicalDetails } from '../models/ChemicalDetails';
import { NilonDetails } from '../models/NilonDetails';
import { Stock } from '../models/Stock';
import { TobaccoLeaves } from '../models/TobaccoLeaves';
import { WrappingLeaves } from '../models/WrappingLeaves';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  createdNewStock(stockDetails: Stock) {
    const path = "http://localhost:8080/stock/createNewStock";
    return this.http.post(path, stockDetails);  
  }

  getAlllAvailableStocks():Observable<Stock[]> {
    const path = "http://localhost:8080/stock/search/all";
    return this.http.get<Stock[]>(path);
  }

  getWrappingLeavesSockQuantity(stockId: string):Observable<any> {
    const path = "http://localhost:8080/stockItems/getwrappingLeaveStockCountByStockId?" + "stockId=" + stockId;
    return this.http.get<any>(path);
  }

  getTobaccoLeavesStockQuantity(stockId: string):Observable<any> {
    const path = "http://localhost:8080/stockItems/getTobaccoLeaveStockCountByStockId?" + "stockId=" + stockId;
    return this.http.get<any>(path);
  }

  getNilonDetailsQuantity(stockId: string):Observable<any> {
    const path = "http://localhost:8080/stockItems/getNilonDetailsCountByStockId?" + "stockId=" + stockId;
    return this.http.get<any>(path);
  }

  getChemicalDetailsQuantity(stockId: string):Observable<any> {
    const path = "http://localhost:8080/stockItems/getChemicalDetailsCountByStockId?" + "stockId=" + stockId;
    return this.http.get<any>(path);
  }

  addWrappingLeavesDetailsForStock(wrappingLeavesDetails: WrappingLeaves) {
    const path = "http://localhost:8080/stockItems/addNewWrappingLeaveSet";
    return this.http.post(path, wrappingLeavesDetails);
  }

  addNewTobaccoDetailsForStock(tobaccodetails: TobaccoLeaves) {
    const path = "http://localhost:8080/stockItems/addNewTobaccoLeaveSet";
    return this.http.post(path, tobaccodetails);
  }

  addNewNilonDetailsForStock(nilonDetails: NilonDetails) {
    const path = "http://localhost:8080/stockItems/addNewNilonSet";
    return this.http.post(path, nilonDetails);
  }

  addNewChemicalDetailsForStock(chemicalDetails: ChemicalDetails) {
    const path = "http://localhost:8080/stockItems/addNewChemicalDetailsSet";
    return this.http.post(path, chemicalDetails);
  }

  getWrappingLeavesByStockId(stockId: string):Observable<WrappingLeaves[]> {
    const path = "http://localhost:8080/stockItems/getWrappingLeavesByStockId?" + "stockId=" + stockId;
    return this.http.get<WrappingLeaves[]>(path);
  }

  getTobaccoLeavesByStockId(stockId: string):Observable<TobaccoLeaves[]> {
    const path = "http://localhost:8080/stockItems/getTobaccoLeavesDetailsByStockId?" + "stockId=" + stockId;
    return this.http.get<TobaccoLeaves[]>(path);
  }

  getNilonDetailsByStockId(stockId: string):Observable<NilonDetails[]> {
    const path = "http://localhost:8080/stockItems/getNilonDetailsByStockId?" + "stockId=" + stockId;
    return this.http.get<NilonDetails[]>(path);
  }

  getChemicalDetailsByStockId(stockId: string):Observable<ChemicalDetails[]> {
    const path = "http://localhost:8080/stockItems/getChemicalDetailsByStockId?" + "stockId=" + stockId;
    return this.http.get<ChemicalDetails[]>(path);
  }

  getWrappingLeavesByRefNoAndStockId(refNo: string, stockId: string):Observable<WrappingLeaves> {
    const path = "http://localhost:8080/stockItems/getWrappingLeavesByRefNoAndStockId?" + "refNo=" + refNo
                  + "&stockId=" + stockId;
    return this.http.get<WrappingLeaves>(path);
  }

  getTobaccoLeavesByRefNoAndStockId(refNo: string, stockId: string):Observable<TobaccoLeaves> {
    const path = "http://localhost:8080/stockItems/getTobaccoLeavesByRefNoAndStockId?" + "refNo=" + refNo
                 + "&stockId=" + stockId;
    return this.http.get<TobaccoLeaves>(path);
  }

  getNilondetailsByRefNoAndStockId(refNo: string, stockId: string):Observable<NilonDetails> {
    const path = "http://localhost:8080/stockItems/getNilonDetailsByRefNoAndStockId?" + "refNo=" + refNo + "&stockId=" + stockId;
    return this.http.get<NilonDetails>(path);
  }

  getChemicalDetailsByRefNoAndStockId(refNo: string, stockId: string):Observable<ChemicalDetails> {
    const path = "http://localhost:8080/stockItems/getChemicalDetailsByrefNoAndStockId?" + "refNo=" + refNo + "&stockId=" + stockId;
    return this.http.get<ChemicalDetails>(path);
  }
}
