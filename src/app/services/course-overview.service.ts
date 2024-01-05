import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {CourseBasic} from "../models/course";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CourseOverviewService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<CourseBasic[]> {
    return this.http.get<CourseBasic[]>(`${this.apiUrl}/courses`)
  }
}
