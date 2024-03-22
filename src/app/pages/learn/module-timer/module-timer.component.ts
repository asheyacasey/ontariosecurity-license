import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CourseTimer, ModuleTimer} from "../../../models/course";
import {TimeFormatterService} from "../../../services/time-formatter.service";
import {concatMap, iif, Observable, of, Subject, Subscription, takeUntil, tap, timer} from "rxjs";
import {LearnService} from "../../../services/learn.service";
import {ModuleTimerService} from "../../../services/module-timer.service";

@Component({
  selector: 'app-module-timer',
  templateUrl: './module-timer.component.html',
  styleUrls: ['./module-timer.component.scss']
})
export class ModuleTimerComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  subscriptions: Subscription[] = [];

  timerSubscription: Subscription | null = null;

  courseId: number | null = null;

  @Input() timeLeft!: number | undefined;
  @Input() moduleId!: number | undefined;

  moduleTimer?: ModuleTimer
  timerValue: string = '-';

  private interval = 20;

  constructor(
    private learnService: LearnService,
    private moduleTimerService: ModuleTimerService,
    private timeFormatterService: TimeFormatterService
  ) {
  }

  ngOnInit(): void {
    if (!this.moduleId) {
      this.moduleId = this.learnService.moduleId;
    }
    if (!this.timeLeft) {
      this.timeLeft = 1000;
    }

    this.setModuleTimer({secondsLeft: this.timeLeft as number});

    this.learnService.courseId$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((courseId) => {
      this.subscriptions.forEach(s => s.unsubscribe());
      this.courseId = courseId;

      if (courseId == null) {
        return;
      }

      this.subscriptions.push(
        this.learnService.moduleId$.pipe(
          takeUntil(this.destroy$)
        ).subscribe((moduleId) => {
          if (moduleId == null) {
            return;
          }

          if (moduleId == this.moduleId as number) {
            this.startTimer();
          } else {
            if (this.timerSubscription !== null) {
              this.pingAndNotify().subscribe(
                moduleTimer => this.setModuleTimer(moduleTimer)
              );
            }
            this.stopTimer();
          }
        })
      );
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();

    this.subscriptions.forEach(s => s.unsubscribe());
  }

  startTimer(): void {
    if (this.timerSubscription !== null) {
      return;
    }

    this.timerSubscription = timer(0, 1000).pipe(
      concatMap((tick) =>
        iif(
          () => (tick % this.interval) === 0,
          this.pingAndNotify(),
          of(this.moduleTimerMinusSecond())
        ))
    ).subscribe((moduleTimer) => {
      this.setModuleTimer(moduleTimer);
    })
  }

  pingAndNotify(): Observable<ModuleTimer> {
    return this.moduleTimerService.ping(this.courseId as number, this.moduleId as number).pipe(
      tap((courseTimer) => {
        if (courseTimer.secondsLeft === 0) {
          this.learnService.setRequiredModuleTimeReached(this.moduleId as number);
        }
      })
    )
  }

  stopTimer(): void {
    this.timerSubscription?.unsubscribe();
    this.timerSubscription = null;
  }

  moduleTimerMinusSecond(): CourseTimer {
    const moduleTimer = this.moduleTimer as ModuleTimer;
    if (moduleTimer.secondsLeft > 0) {
      moduleTimer.secondsLeft -= 1;
    }
    return moduleTimer;
  }

  setModuleTimer(moduleTimer: ModuleTimer): void {
    this.moduleTimer = moduleTimer;
    this.updateTimerValue(this.moduleTimer.secondsLeft);
  }

  updateTimerValue(secondsLeft: number): void {
    if (secondsLeft === 0) {
      this.timerValue = '';
    } else {
      this.timerValue = this.timeFormatterService.secondsToTime(secondsLeft);
    }
  }

}
