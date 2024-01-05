import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LearnService} from "../../../services/learn.service";
import {LinkedLecture} from "../../../models/lecture";
import {Subject, takeUntil} from "rxjs";
import {CourseNavigationStateService} from "../../../services/course-navigation-state.service";

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
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      this.learnService.setLectureId(+params['lectureId']);
    });

    this.learnService.lectureId$
      .pipe(
        takeUntil(this.destroy$),
      ).subscribe((lectureId) => {
      if (lectureId === null) {
        return;
      }

      this.lectureId = lectureId;

      this.learnService.getLecture(lectureId).subscribe((linkedLecture) => {
        this.lecture = linkedLecture;

        this.learnService.setTitle(this.lecture.name);
        this.learnService.setModuleId(this.lecture.module.id);

        this.courseNavigationStateService.addState({
          courseId: this.learnService.courseId as number,
          itemType: 'lecture',
          itemId: lectureId
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  goToQuiz() {
    const quizId = this.lecture?.module?.quizId;
    if (quizId) {
      this.router.navigate(['/learn', this.learnService.courseId, 'quiz', quizId]);
    }
  }
}
