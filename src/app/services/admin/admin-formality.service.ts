import {Injectable} from '@angular/core';
import {AdminUser} from "../../models/admin/user";
import {AdminCourse} from "../../models/admin/course";
import {delay, Observable, of} from "rxjs";
import {AdminFormalitiesStatus} from "../../models/admin/formality";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {AdminDiscountCode} from "../../models/admin/discount-code";

const STATUS: AdminFormalitiesStatus = {
  cpr: {
    id: 12,
    expiresAt: '2021'
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminFormalityService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getStatus(user: AdminUser, course: AdminCourse): Observable<AdminFormalitiesStatus> {
    return this.http.get<AdminFormalitiesStatus>(`${this.apiUrl}/admin/formalities/user/${user.id}/course/${course.id}/status`);
  }

  downloadCPRDocument(userCourseCprDocumentId: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(`${this.apiUrl}/admin/formalities/cpr/${userCourseCprDocumentId}/download`, {
      observe: 'response',
      responseType: 'blob' as 'json'
    });
  }

  downloadConsentFormPDF(userCourseConsentDataId: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(`${this.apiUrl}/admin/formalities/consent/${userCourseConsentDataId}/download`, {
      observe: 'response',
      responseType: 'blob' as 'json'
    })
  }

  updateTCN(user: AdminUser, course: AdminCourse, tcn: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/formalities/user/${user.id}/course/${course.id}/tcn`, {
      tcn: tcn
    });
  }
}
