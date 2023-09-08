import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

    constructor(private http: HttpClient) { }




  //package service;
//   getAllPackages(providerId: number ,pageNumber?:number, pageSize?: number): Observable<any> {
//     return this.http.get<any>(environment.apiUrl + `Package/Search?providerId=${providerId}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
//   }

  addServiceSetup(obj: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'Service/AddServicesSetup', obj);
  }


//   getServiceByCategoryId(data: any): Observable<any> {
//     return this.http.post<any>(environment.apiUrl + `Services/GetServicesSetup`, data);
//   }

//   getOne(id: number): Observable<any> {
//     return this.http.get<any>(environment.apiUrl + `Package/${id}`);
//   }

//   updatePackage(obj: any): Observable<any> {
//     return this.http.post<any>(environment.apiUrl + 'Package/UpdatePackage', obj);
//   }

}
