import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ResumeDataUpload, ResumeUpload} from "../models/formality";
import {Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  submit(courseId: number, data: ResumeUpload): Observable<any> {
    const licenseData = new FormData();
    licenseData.append('file', data.licenseFile);

    const formData = data as ResumeDataUpload;

    return this.http.post(`${this.apiUrl}/course/${courseId}/formalities/resume`, {}).pipe(
      switchMap(() => this.http.put(`${this.apiUrl}/course/${courseId}/formalities/resume/license`, licenseData)),
      switchMap(() => this.http.put(`${this.apiUrl}/course/${courseId}/formalities/resume/data`, formData))
    )
  }
}
