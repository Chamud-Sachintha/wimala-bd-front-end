import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/UserModel';
import { Observable } from 'rxjs';
import { JWTRequest } from '../models/JWTRequest';
import { JWTResponse } from '../models/JWTResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  authenticateUser(jwtRequest: JWTRequest):Observable<JWTResponse> {
    // const path = "https://wimala-bd-platform-production.up.railway.app/authenticate";
    const path = "http://localhost:8080/authenticate";
    return this.http.post<JWTResponse>(path, jwtRequest);
  }
}
