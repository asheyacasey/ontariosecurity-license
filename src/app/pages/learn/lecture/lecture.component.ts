import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LearnService} from "../../../services/learn.service";
import {LinkedLecture} from "../../../models/lecture";
import {catchError, Subject, takeUntil, throwError} from "rxjs";
import {CourseNavigationStateService} from "../../../services/course-navigation-state.service";
import {HttpErrorResponse} from "@angular/common/http";
import {LearnLanguageService} from "../../../services/learn-language.service";

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss', '../learn.component.scss']
})
export class LectureComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  lectureId?: number;
  lecture?: LinkedLecture;

  constructor(
    private learnService: LearnService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseNavigationStateService: CourseNavigationStateService,
    private learnLanguageService: LearnLanguageService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      this.learnService.setLectureId(+params['lectureId']);
    });

    this.learnLanguageService.language$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(language => {
      this.initializeLecture();
    });

    this.learnService.lectureId$
      .pipe(
        takeUntil(this.destroy$),
      ).subscribe((lectureId) => {
      if (lectureId === null) {
        return;
      }

      this.lectureId = lectureId;
      this.initializeLecture();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  initializeLecture(): void {
    if (!this.lectureId) {
      return;
    }

    this.learnService.getLecture(this.lectureId).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.router.navigate(['/learn', this.learnService.courseId]);
        }
        return throwError(() => err);
      })
    ).subscribe((linkedLecture) => {
      this.lecture = linkedLecture;

      this.learnService.setTitle(this.lecture.name);
      this.learnService.setModuleId(this.lecture.module.id);

      this.courseNavigationStateService.addState({
        courseId: this.learnService.courseId as number,
        itemType: 'lecture',
        itemId: this.lectureId as number
      });
    });
  }

  goToQuiz() {
    const quizId = this.lecture?.module?.quizId;
    if (quizId) {
      this.router.navigate(['/learn', this.learnService.courseId, 'quiz', quizId]);
    }
  }
}
