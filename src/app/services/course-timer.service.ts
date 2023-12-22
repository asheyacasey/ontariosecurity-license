import {Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";
import {CourseTimer} from "../models/course";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CourseTimerService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  ping(courseId: number): Observable<CourseTimer> {
    return this.http.post<CourseTimer>(`${this.apiUrl}/course/${courseId}/ping`, {}).pipe(
      tap((courseTimer: CourseTimer) => {

      })
    )
  }
}
