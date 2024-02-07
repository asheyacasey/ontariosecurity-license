import {Component, OnDestroy, OnInit} from '@angular/core';
import {LearnService} from "../../../services/learn.service";
import {concatMap, iif, of, Subject, Subscription, takeUntil, tap, timer} from "rxjs";
import {CourseTimer} from "../../../models/course";
import {CourseTimerService} from "../../../services/course-timer.service";
import {TimeFormatterService} from "../../../services/time-formatter.service";

@Component({
  selector: 'app-course-timer',
  templateUrl: './course-timer.component.html',
  styleUrls: ['./course-timer.component.scss']
})
export class CourseTimerComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  subscriptions: Subscription[] = [];

  courseTimer?: CourseTimer
  timerValue: string = '-';

  private interval = 20;

  constructor(
    private learnService: LearnService,
    private courseTimerService: CourseTimerService,
    private timeFormatterService: TimeFormatterService
  ) {
  }

  ngOnInit(): void {
    this.learnService.courseId$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((courseId) => {
      this.subscriptions.forEach(s => s.unsubscribe());

      if (courseId === null) {
        return;
      }

      // first initialize the course timer with a value from the backend
      this.courseTimerService.ping(courseId).subscribe((courseTimer) => {
        this.setCourseTimer(courseTimer);

        // then, every second
        const subscription = timer(0, 1000).pipe(
          concatMap((tick) =>
            iif(
              // if it's nth tick, query the backend
              () => (tick % this.interval) === 0,
              this.courseTimerService.ping(courseId),
              of(this.courseTimerMinusSecond()))
          ),
        ).subscribe((courseTimer) => {
          this.setCourseTimer(courseTimer);
        });

        this.subscriptions.push(subscription);
      })
    });
  }

  setCourseTimer(courseTimer: CourseTimer): void {
    this.courseTimer = courseTimer;
    this.updateTimerValue(this.courseTimer.secondsLeft);
  }

  courseTimerMinusSecond(): CourseTimer {
    const courseTimer = this.courseTimer as CourseTimer;
    if (courseTimer.secondsLeft > 0) {
      courseTimer.secondsLeft -= 1;
    }
    return courseTimer;
  }

  updateTimerValue(secondsLeft: number): void {
    const value = this.timeFormatterService.secondsToTime(secondsLeft);
    const prefix = secondsLeft === 0 ? '' : '-';

    this.timerValue = `${prefix}${value}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();

    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
