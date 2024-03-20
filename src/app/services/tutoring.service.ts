import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TutoringStatus} from "../models/formality";

@Injectable({
  providedIn: 'root'
})
export class TutoringService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getStatus(courseId: number): Observable<TutoringStatus> {
    return this.http.get<TutoringStatus>(`${this.apiUrl}/course/${courseId}/formalities/tutoring`);
  }
}
