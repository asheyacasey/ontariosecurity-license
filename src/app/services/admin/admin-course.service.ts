import { Injectable } from '@angular/core';
import {SearchService} from "../../models/admin/search-service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PagedAdminCourses} from "../../models/admin/course";

@Injectable({
  providedIn: 'root'
})
export class AdminCourseService implements SearchService<PagedAdminCourses> {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  search(search: string | null, page: number): Observable<PagedAdminCourses> {
    return this.http.get<PagedAdminCourses>(`${this.apiUrl}/admin/courses?search=${search}&page=${page}`)
  }
}
