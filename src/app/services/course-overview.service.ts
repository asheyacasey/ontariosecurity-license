import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {CourseBasic} from "../models/course";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Language} from "../models/language";
import {LanguageService} from "./language.service";

@Injectable({
  providedIn: 'root'
})
export class CourseOverviewService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private languageService: LanguageService) {
  }

  getAll(): Observable<CourseBasic[]> {
    return this.http.get<CourseBasic[]>(`${this.apiUrl}/courses`)
  }

  getLanguages(courseId: number): Observable<Language[]> {
    return this.http.get<Language[]>(`${this.apiUrl}/course/${courseId}/languages`);
  }

  get(courseId: number): Observable<CourseBasic> {
    const params = new HttpParams()
      .set('language', this.languageService.getLanguage().code);

    return this.http.get<CourseBasic>(`${this.apiUrl}/course/${courseId}/overview`, {params});
  }
}
