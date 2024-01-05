import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {CourseProgressOverview} from "../models/course";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CourseProgressOverviewService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<CourseProgressOverview[]> {
    return this.http.get<CourseProgressOverview[]>(`${this.apiUrl}/courses/owned`);
  }

  getById(courseId: number): Observable<CourseProgressOverview | null> {
    return this.getAll().pipe(
      map((courses) => courses.find(c => c.id === courseId) || null)
    );
  }
}
