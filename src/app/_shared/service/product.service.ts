import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }



  //package service;
  getAllProducts(providerId: number, pageNumber?: number, pageSize?: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Package/Search?providerId=${providerId}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
  addPackage(obj: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'Package', obj);
  }
  getServiceByCategoryId(data: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + `Service/GetServicesSetup`, data);
  }


  getOne(id: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Package/${id}`);
  }

  updatePackage(obj: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'Package/UpdatePackage', obj);
  }


  search(params: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Package/Search?Name=${params.Name}&ProviderId=${params.ProviderId}`);
  }

  searchProducts(searchParam: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Package/Search?`, { ...searchParam });
  }

}
