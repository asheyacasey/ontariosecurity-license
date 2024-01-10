import { Injectable } from '@angular/core';
import {SearchService} from "../../models/admin/search-service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PagedAdminPayments} from "../../models/admin/payment";

@Injectable({
  providedIn: 'root'
})
export class AdminPaymentService implements SearchService<PagedAdminPayments> {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  search(search: string | null, page: number): Observable<PagedAdminPayments> {
    return this.http.get<PagedAdminPayments>(`${this.apiUrl}/admin/payments?search=${search}&page=${page}`)
  }
}

