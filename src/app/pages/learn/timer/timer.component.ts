import {Component, OnDestroy, OnInit} from '@angular/core';
import {LearnService} from "../../../services/learn.service";
import {interval, Subject, Subscription, switchMap, takeUntil, timer} from "rxjs";
import {CourseTimer} from "../../../models/course";
import {CourseTimerService} from "../../../services/course-timer.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  subscriptions: Subscription[] = [];

  courseTimer?: CourseTimer
  timerValue: string = '-';

  private interval = 15;

  constructor(
    private learnService: LearnService,
    private courseTimerService: CourseTimerService
  ) {
  }

  ngOnInit(): void {
    this.learnService.courseId$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((courseId) => {
      if (courseId === null) {
        return;
      }

      this.subscriptions.forEach(s => s.unsubscribe());

      // todo: move to courseTimerService
      const subscription = timer(0, this.interval * 1000).pipe(
        switchMap(() => this.courseTimerService.ping(courseId))
      ).subscribe((courseTimer) => {
        this.courseTimer = courseTimer;
        this.updateTimerValue(this.courseTimer.secondsLeft);
      });

      this.subscriptions.push(subscription);
    });
  }

  updateTimerValue(secondsLeft: number): void {
    let hours = Math.floor(secondsLeft / 3600).toString().padStart(2, '0');
    const minutes = (Math.floor(secondsLeft / 60) % 60).toString().padStart(2, '0');

    this.timerValue = `-${hours}:${minutes}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();

    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
