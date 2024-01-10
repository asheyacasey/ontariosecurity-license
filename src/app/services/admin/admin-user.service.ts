import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable, of} from "rxjs";
import {PagedAdminUsers} from "../../models/admin/user";
import {environment} from "../../../environments/environment";
import {SearchService} from "../../models/admin/search-service";


@Injectable({
  providedIn: 'root'
})
export class AdminUserService implements SearchService<PagedAdminUsers> {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  search(search: string | null, page: number): Observable<PagedAdminUsers> {
    return this.http.get<PagedAdminUsers>(`${this.apiUrl}/admin/users?search=${search}&page=${page}`)
  }
}
