import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, Subject, takeUntil} from "rxjs";
import {FormalityService} from "../../../services/formality.service";
import {FormalitiesStatus} from "../../../models/formality";

@Component({
  selector: 'app-tcn',
  templateUrl: './tcn.component.html',
  styleUrls: ['./tcn.component.scss', '../formalities.shared.scss', '../../../shared/shared.scss']
})
export class TcnComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  courseId: number | null = null;
  formalitiesStatus: FormalitiesStatus | null = null;

  constructor(
    private formalityService: FormalityService,
  ) {
  }

  ngOnInit(): void {
    this.formalityService.courseId$.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()
    ).subscribe(courseId => {
      this.courseId = courseId;

    });

    this.formalityService.formalitiesStatus$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(status => {
      this.formalitiesStatus = status;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getTCNNumber(): string {
    return (this.formalitiesStatus?.tcn.tcn || '').toString();
  }

  printTCN(): void {
    window.print();
  }
}
