import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, of, Subject, tap} from "rxjs";
import {ConsentPrefillValues, ConsentUpload, CPRDocumentUpload, FormalitiesStatus} from "../models/formality";
import {Form} from "@angular/forms";
import {CourseTimer} from "../models/course";

const FORMALITIES: FormalitiesStatus = {
  modules: {
    total: 12,
    completed: 12,
    stepCompleted: true
  },
  cpr: {
    cprTrainingIncluded: true,
    stepCompleted: false
  },
  consent: {
    stepCompleted: false
  },
  tcn: {
    state: 'WAITING',
    stepCompleted: false
  }
};

@Injectable({
  providedIn: 'root'
})
export class FormalityService {
  private apiUrl: string = environment.apiUrl;

  private _courseId$$: Subject<number | null> = new BehaviorSubject<number | null>(null);
  readonly courseId$ = this._courseId$$.asObservable();

  private _formalitiesStatus$$: Subject<FormalitiesStatus | null> = new BehaviorSubject<FormalitiesStatus | null>(null);
  readonly formalitiesStatus$ = this._formalitiesStatus$$.asObservable();

  formalitiesStatus: FormalitiesStatus | null = null;
  courseId: number | null = null;

  constructor(private http: HttpClient) {
  }


  setCourseId(courseId: number): void {
    this.courseId = courseId;
    this._courseId$$.next(this.courseId);
  }

  getStatus(courseId: number): Observable<FormalitiesStatus> {
    return this.http.get<FormalitiesStatus>(`${this.apiUrl}/course/${courseId}/formalities/status`).pipe(
      tap((status) => {
        this.formalitiesStatus = status;
        this._formalitiesStatus$$.next(this.formalitiesStatus);
      })
    )
  }

  uploadCPR(courseId: number, data: CPRDocumentUpload): Observable<any> {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('expires_at', data.expiresAt);

    return this.http.post(`${this.apiUrl}/course/${courseId}/formalities/cpr/upload`, formData);
  }
}
