import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, Subject, takeUntil} from "rxjs";
import {LearnService} from "../../../services/learn.service";
import {CourseNavigationStateService} from "../../../services/course-navigation-state.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private learnService: LearnService,
    private courseNavigationStateService: CourseNavigationStateService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.learnService.courseId$.pipe(
      takeUntil(this.destroy$),
      filter((courseId) => courseId !== null)
    ).subscribe((courseId) => {
      const courseState = this.courseNavigationStateService.getState(courseId);
      if (courseState) {
        this.router.navigate(this.courseNavigationStateService.toUrl(courseState));
      } else {
        this.learnService.courseModules$.pipe(
          takeUntil(this.destroy$),
          filter((modules) => modules.length > 0)
        ).subscribe((modules) => {
          const firstModule = modules[0];
          const firstLecture = firstModule.lectureIds[0];

          this.router.navigate(['/learn', courseId, 'lecture', firstLecture]);
          this.learnService.setModuleId(firstModule.id);
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
