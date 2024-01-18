import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ConsentPrefillValues, ConsentUpload} from "../models/formality";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConsentFormService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getPrefill(courseId: number): Observable<ConsentPrefillValues> {
    return this.http.get<ConsentPrefillValues>(`${this.apiUrl}/course/${courseId}/formalities/consent/prefill`);
  }

  save(courseId: number, data: ConsentUpload): Observable<any> {
    return this.http.post(`${this.apiUrl}/course/${courseId}/formalities/consent`, data);
  }
}
