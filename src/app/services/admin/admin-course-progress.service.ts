import { Injectable } from '@angular/core';
import {SearchService} from "../../models/admin/search-service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PagedAdminCourseProgress} from "../../models/admin/course-progress";

@Injectable({
  providedIn: 'root'
})
export class AdminCourseProgressService implements SearchService<PagedAdminCourseProgress> {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  search(search: string | null, page: number): Observable<PagedAdminCourseProgress> {
    return this.http.get<PagedAdminCourseProgress>(`${this.apiUrl}/admin/course-progress?search=${search}&page=${page}`)
  }
}
