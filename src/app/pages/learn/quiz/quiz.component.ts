import {Component, OnDestroy, OnInit} from '@angular/core';
import {LearnService} from "../../../services/learn.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LinkedQuiz, QuizAnswers, QuizDetails, QuizQuestionAnswerChange} from "../../../models/quiz";
import {catchError, filter, Subject, takeUntil, tap, throwError} from "rxjs";
import {ViewportScroller} from "@angular/common";
import {CourseNavigationStateService} from "../../../services/course-navigation-state.service";
import {HttpErrorResponse} from "@angular/common/http";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss', '../learn.component.scss', '../../../shared/shared.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  quizId!: number;
  quiz!: LinkedQuiz;

  // when quiz is in progress
  moduleQuiz: QuizDetails | null = null;
  quizAnswers: QuizAnswers | null = null;

  constructor(
    private learnService: LearnService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private viewport: ViewportScroller,
    private courseNavigationStateService: CourseNavigationStateService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      this.learnService.setQuizId(+params['quizId']);
    });

    this.learnService.quizId$.pipe(
      takeUntil(this.destroy$),
      filter((quizId) => quizId !== null)
    ).subscribe((quizId) => {
      if (quizId === null) {
        return;
      }

      this.quizId = quizId;

      this.learnService.getQuiz(quizId).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 403 || err.status === 404) {
            this.router.navigate(['/learn', this.learnService.courseId]);
          }
          return throwError(() => err);
        })
      ).subscribe((quiz) => {
        this.quiz = quiz;

        this.learnService.setTitle('Summary of module ' + this.quiz?.module.moduleNumber + ' and module test');
        this.learnService.setModuleId(this.quiz.module.id);

        this.courseNavigationStateService.addState({
          courseId: this.learnService.courseId as number,
          itemType: 'quiz',
          itemId: quizId
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  // todo: decouple

  startQuiz(): void {
    this.learnService.getQuizQuestions(this.quizId).subscribe((quizProgressDetails) => {
      this.moduleQuiz = quizProgressDetails.moduleQuiz
      this.quizAnswers = {
        identifier: quizProgressDetails.identifier,
        answers: this.moduleQuiz.questions.map((q) => {
          return {
            questionId: q.id,
            answerIds: []
          }
        })
      };
    });

  }

  onOptionChange($event: QuizQuestionAnswerChange) {
    const item = this.quizAnswers?.answers.find(a => a.questionId === $event.questionId);
    if (!item) {
      return;
    }
    if ($event.multiSelection) {
      const index = item.answerIds.indexOf($event.answerId);
      if ($event.checked && index === -1) {
        item.answerIds.push($event.answerId);
      } else if (!$event.checked && index > -1) {
        item.answerIds.splice(index, 1);
      }
    } else {
      item.answerIds = [$event.answerId];
    }
  }


  submitQuiz() {
    if (!this.quizAnswers) {
      return;
    }

    this.viewport.scrollToPosition([0, 0]);

    this.learnService.sendQuizAnswers(this.quiz.id, this.quizAnswers).pipe(
      tap((results) => {
        this.learnService.setQuizIdCompleted(this.quiz.id);
      })
    ).subscribe((results) => {
      this.quiz.result = results;
      this.moduleQuiz = null;
    });
  }
}
