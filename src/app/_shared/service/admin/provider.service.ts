import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }
  getAll(pageNumber?:number, pageSize?: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Admin/GeAllProviders?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
  getOne(id: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Admin/GetProviderById?providerId=${id}`);
  }

  providerAction(data: any): Observable<any> {
    return this.http.put<any>(environment.apiUrl + 'Admin/ApproveProvider', data);
  }

}
