import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LearnService} from "../../../services/learn.service";
import {LinkedLecture} from "../../../models/lecture";
import {Subject} from "rxjs";

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss', '../learn.component.scss', '../navigation.scss']
})
export class LectureComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  lectureId?: number;
  lecture?: LinkedLecture;

  constructor(
    private learnService: LearnService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      this.lectureId = Number(params['lectureId']);
      learnService.setLectureId(this.lectureId);
    });
  }

  ngOnInit(): void {
    this.learnService.lectureId$.subscribe((lectureId) => {
      if (lectureId === null) {
        return;
      }

      this.learnService.getLecture(lectureId).subscribe((linkedLecture) => {
        this.lecture = linkedLecture;

        this.learnService.setTitle(this.lecture.name);
        this.learnService.setModuleId(this.lecture.module.id);
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
