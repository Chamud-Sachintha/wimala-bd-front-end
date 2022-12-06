import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../models/Stock';

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
}
