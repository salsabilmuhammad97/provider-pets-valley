import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LookupTypes } from '../enum/lookupTypes.enum';
@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.getLookupDataByType(LookupTypes.MedicalCategories);
  }


  /** get lookup values by send it's id using `Lookup` enum */
  getLookupDataByType(lookupTypeId: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + 'Lookup/GetLookupValues?lookupTypeId=' + lookupTypeId);
  }

}
