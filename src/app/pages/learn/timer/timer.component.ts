import {Component, OnDestroy, OnInit} from '@angular/core';
import {LearnService} from "../../../services/learn.service";
import {interval, Subscription} from "rxjs";
import {CourseTimer} from "../../../models/course";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  courseTimer?: CourseTimer

  constructor(private learnService: LearnService) { }

  ngOnInit(): void {
    this.learnService.courseId$.subscribe((courseId) => {
      if (courseId === null) {
        return;
      }

      // todo: ensure it's the same course ID as before
      // todo: call course timer for an update

      this.learnService.getCourseTimer(courseId).subscribe((courseTimer) => {
        this.courseTimer = courseTimer;
        this.subscriptions.push(
          interval(5 * 1000).subscribe(() => {
            if(!this.courseTimer) {
              return;
            }
            this.courseTimer.secondsLeft -= 60;
            if (this.courseTimer.secondsLeft < 0) {
              this.courseTimer.secondsLeft = 0;
            }
          })
        );
      });

    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
