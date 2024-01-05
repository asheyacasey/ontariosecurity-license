import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject, tap} from "rxjs";
import {FormalitiesStatus} from "../models/formality";
import {Form} from "@angular/forms";

const FORMALITIES: FormalitiesStatus = {
  modules: {
    modulesCompleted: 14,
    modulesTotal: 14,
    completed: true
  },
  cpr: {
    completed: false
  },
  consent: {
    completed: false
  },
  tcn: {
    completed: false
  }
}

@Injectable({
  providedIn: 'root'
})
export class FormalitiesService {

  status?: FormalitiesStatus
  status$: Subject<FormalitiesStatus | null> = new BehaviorSubject<FormalitiesStatus | null>(null);

  constructor() { }

  getStatus(courseId: number): Observable<FormalitiesStatus> {
    return of(FORMALITIES).pipe(
      tap((status) => {
        this.status = status;
        this.status$.next(status);
      })
    );
  }
}
