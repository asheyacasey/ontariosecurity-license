import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ModuleTimer} from "../models/course";

@Injectable({
  providedIn: 'root'
})
export class ModuleTimerService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  ping(courseId: number, moduleId: number): Observable<ModuleTimer> {
    return this.http.post<ModuleTimer>(`${this.apiUrl}/course/${courseId}/module/${moduleId}/ping`, {});
  }
}
