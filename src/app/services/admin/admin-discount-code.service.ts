import { Injectable } from '@angular/core';
import {SearchService} from "../../models/admin/search-service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {AdminDiscountCode, AdminDiscountCodeCreate, PagedAdminDiscountCodes} from "../../models/admin/discount-code";

@Injectable({
  providedIn: 'root'
})
export class AdminDiscountCodeService implements SearchService<PagedAdminDiscountCodes> {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  search(search: string | null, page: number): Observable<PagedAdminDiscountCodes> {
    return this.http.get<PagedAdminDiscountCodes>(`${this.apiUrl}/admin/discount-codes?search=${search}&page=${page}`)
  }

  getById(id: number): Observable<AdminDiscountCode> {
    return this.http.get<AdminDiscountCode>(`${this.apiUrl}/admin/discount-codes/${id}`);
  }

  create(discountCodeData: AdminDiscountCodeCreate): Observable<AdminDiscountCode> {
    return this.http.post<AdminDiscountCode>(`${this.apiUrl}/admin/discount-codes`, discountCodeData);
  }

  update(id: number, discountCodeData: AdminDiscountCodeCreate): Observable<AdminDiscountCode> {
    return this.http.put<AdminDiscountCode>(`${this.apiUrl}/admin/discount-codes/${id}`, discountCodeData);
  }
}
