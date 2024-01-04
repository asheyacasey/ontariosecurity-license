import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SelectableCourseProgressModule} from "./selectable-course-progress-module";
import {LearnService} from "../../services/learn.service";
import {EMPTY, filter, Subject, Subscription, switchMap, take, takeUntil} from "rxjs";
import {CourseProgressModule} from "../../models/course";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss', '../../shared/shared.scss']
})
export class LearnComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  openMenu$: Subject<boolean> = new Subject<boolean>();

  courseId?: number;
  modules: SelectableCourseProgressModule[] = [];

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private learnService: LearnService,
  ) {
    activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      this.courseId = Number(params['courseId']);
      learnService.setCourseId(this.courseId);
    });
  }

  ngOnInit(): void {
    this.learnService.courseId$.pipe(
      takeUntil(this.destroy$),
      filter((courseId) => courseId !== null),
      switchMap((courseId) => this.learnService.getCourseModules(courseId))
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

      this.learnService.moduleIdCompleted$.pipe(
        takeUntil(this.destroy$)
      ).subscribe((moduleId) => {
        const module = this.modules.find(m => m.id === moduleId);
        if (!module) {
          return;
        }

        module.completed = true;
      });

      this.learnService.moduleIdNotCompleted$.pipe(
        takeUntil(this.destroy$)
      ).subscribe((moduleId) => {
        const module = this.modules.find(m => m.id === moduleId);
        if (!module) {
          return;
        }

        module.completed = false;
      });

      this.learnService.lectureIdLoaded$.pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.courseId ? this.learnService.getCourseModules(this.courseId) : EMPTY)
      ).subscribe((modules) => {
        this.updateModules(modules);
      });
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
    this.modules.forEach((module) => {
      const m = modules.find(m => m.id === module.id);
      if (m) {
        module.completed = m.completed;
      }
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

  openMenu() {
    this.openMenu$.next(true);
  }

  goToFormalities(): void {
    this.router.navigate(['/formalities', this.courseId, 'documents']);
  }
}
