import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JobsCountCity} from "../models/job";

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getJobOffersCount(): Observable<JobsCountCity> {
    return this.http.get<JobsCountCity>(`${this.apiUrl}/jobs/offers/count`);
  }
}
