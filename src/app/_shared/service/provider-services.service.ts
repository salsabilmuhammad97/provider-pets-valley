import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProviderServicesService {

    constructor(private http: HttpClient) { }


    getAll(providerId: number, PageNumber?: any, PageSize?: any): Observable<any> {
        return this.http.get<any>(environment.apiUrl + `Service/SearchProviderServices?userId=${providerId}&PageNumber=${PageNumber}&PageSize=${PageSize}`);
    }

    search(params: any): Observable<any> {
        return this.http.get<any>(environment.apiUrl + `Services/GetServicesList`, {
            ...params
        });
    }

    addService(obj: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + 'Service', obj);
    }

    //   getOne(id: number): Observable<any> {
    //     return this.http.get<any>(environment.apiUrl + `Service/${id}`);
    //   }
    getOne(id: number): Observable<any> {
        return this.http.get<any>(environment.apiUrl + `Service/GetProviderService?id=${id}`);
    }



    updateService(obj: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + 'Service/UpdateService', obj);
    }


}
