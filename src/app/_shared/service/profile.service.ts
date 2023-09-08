import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    constructor(private http: HttpClient) { }


  getOne(id: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `Provider/GetProviderById?providerId=${id}`);
  }

 updateProfile(obj: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'Provider/EditProviderProfile', obj);
}


// getImage(id: number): Observable<any> {
//     const httpOptions = {
//         responseType: 'blob' as 'json'
//       }
//     return this.http.get<any>(environment.apiUrl + `Media/get-provider-image/${id}`, httpOptions);


//   }

  getImage(id: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(environment.apiUrl + `Media/get-provider-image/${id}`,{ observe: 'response', responseType: 'blob' as 'json'});
  }


}
