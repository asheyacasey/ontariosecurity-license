import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SelectableCourseProgressModule} from "./selectable-course-progress-module";
import {LearnService} from "../../services/learn.service";
import {
  catchError,
  combineLatest,
  EMPTY,
  filter,
  merge,
  Observable, of,
  Subject,
  switchMap,
  takeUntil,
  tap, throwError
} from "rxjs";
import {CourseProgressModule} from "../../models/course";
import {Title} from "@angular/platform-browser";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss', '../../shared/shared.scss']
})
export class LearnComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  courseCompleted$: Observable<boolean>;

  openMenu$: Subject<boolean> = new Subject<boolean>();

  courseId?: number;
  modules: SelectableCourseProgressModule[] = [];

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private learnService: LearnService,
  ) {
    this.courseCompleted$ = learnService.courseCompleted$;
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      this.learnService.setCourseId(+params['courseId']);
    });

    this.learnService.courseId$.pipe(
      takeUntil(this.destroy$),
      filter((courseId) => courseId !== null),
      tap((courseId) => {
        this.courseId = courseId;
      }),
      switchMap((courseId) => this.learnService.getCourseModules(courseId)),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.router.navigate(['/profile']);
        }
        return throwError(() => err);
      })
    ).subscribe((modules) => {

      this.initializeModules(modules);

      this.learnService.moduleId$.pipe(
        takeUntil(this.destroy$)
      ).subscribe((moduleId) => {
        if (moduleId === null) {
          return;
        }
        const module = this.modules.find(m => m.id === moduleId);
        if (!module) {
          return;
        }

        this.markSelectedModule(module);
      });

      merge(
        this.learnService.moduleIdCompleted$,
        this.learnService.moduleIdNotCompleted$,
        this.learnService.lectureIdLoaded$
      ).pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.courseId ? this.learnService.getCourseModules(this.courseId) : EMPTY)
      ).subscribe((modules) => {
        this.updateModules(modules);
      })

      // if required time has been reached and all course modules are completed,
      // the course is considered to be completed
      combineLatest([
        this.learnService.requiredCourseTimeReached$,
        this.learnService.courseModules$
      ]).pipe(
        takeUntil(this.destroy$)
      ).subscribe(
        ([timeReached, courseModules]) => {
          if (timeReached && courseModules.every(m => m.completed)) {
            this.learnService.setCourseCompleted();
          } else {
            this.learnService.setCourseNotCompleted();
          }
        }
      )
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  initializeModules(modules: CourseProgressModule[]): void {
    this.modules = modules.map((m) => {
      const module = m as SelectableCourseProgressModule;
      module.selected = false;
      return module
    });
  }

  updateModules(modules: CourseProgressModule[]): void {
    this.modules = this.modules.map((module) => {
      const m = modules.find(m => m.id === module.id);
      if (m) {
        module.completed = m.completed;
      }
      return module;
    })
  }

  markSelectedModule(module: SelectableCourseProgressModule): void {
    this.modules.forEach((m) => {
      m.selected = m.id === module.id;
    });
  }

  setSelectedModule(module: SelectableCourseProgressModule): void {
    const activeModule = this.modules.find(m => m.id === module.id);
    if (!activeModule) {
      return;
    }
    const firstLectureId = activeModule.lectureIds[0];
    this.router.navigate(['/learn', this.courseId, 'lecture', firstLectureId]);

    this.learnService.setModuleId(module.id);
  }

  openMenu(): void {
    this.openMenu$.next(true);
  }

  goToFormalities(): void {
    this.router.navigate(['/formalities', this.courseId, 'cpr']);
  }
}
