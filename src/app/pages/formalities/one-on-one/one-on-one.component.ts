import {Component, OnDestroy, OnInit} from '@angular/core';
import {distinctUntilChanged, filter, Subject, switchMap, takeUntil} from "rxjs";
import {FormalityService} from "../../../services/formality.service";
import {TutoringService} from "../../../services/tutoring.service";

export {};
declare global {
  interface Window {
    Calendly: any;
  }
}
declare var preInitCalendly: Function;

@Component({
  selector: 'app-one-on-one',
  templateUrl: './one-on-one.component.html',
  styleUrls: ['./one-on-one.component.scss']
})
export class OneOnOneComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  paid: boolean = false;

  constructor(
    private formalityService: FormalityService,
    private tutoringService: TutoringService
  ) {
  }

  ngOnInit(): void {
    this.formalityService.courseId$.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(),
      filter((courseId) => courseId !== null),
      switchMap((courseId) => this.tutoringService.getStatus(courseId as number))
    ).subscribe(data => {
      this.paid = data.paid;
      if (data.paid) {
        preInitCalendly();

        window.Calendly.initInlineWidget({
          url: data.calendlyUrl,
          parentElement: document.querySelector('.calendly-inline-widget'),
          prefill: {
            email: data.email
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
