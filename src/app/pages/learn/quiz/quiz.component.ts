import {Component, OnDestroy, OnInit} from '@angular/core';
import {LinkedLecture} from "../../../models/lecture";
import {LearnService} from "../../../services/learn.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LinkedQuiz, QuizAnswers, QuizDetails, QuizQuestionAnswerChange} from "../../../models/quiz";
import {Subject, takeUntil, tap} from "rxjs";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss', '../learn.component.scss', '../navigation.scss']
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
    private viewport: ViewportScroller
  ) {
    activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      this.quizId = Number(params['quizId']);
      learnService.setQuizId(this.quizId);
    });
  }

  ngOnInit(): void {
    this.learnService.quizId$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((quizId) => {
      if (quizId === null) {
        return;
      }

      this.learnService.getQuiz(quizId).pipe(
        takeUntil(this.destroy$)
      ).subscribe((quiz) => {
        this.quiz = quiz;

        this.learnService.setTitle('Quiz for module ' + this.quiz?.module.id);
        this.learnService.setModuleId(this.quiz.module.id);
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  // todo: decouple

  startQuiz(): void {
    this.learnService.getQuizQuestions(this.quizId).pipe(
      takeUntil(this.destroy$)
    ).subscribe((quizProgressDetails) => {
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
        if (results.passed) {
          this.learnService.setModuleIdCompleted(this.quiz.module.id);
        } else {
          this.learnService.setModuleIdNotCompleted(this.quiz.module.id);
        }
      })
    ).subscribe((results) => {
      this.quiz.result = results;
      this.moduleQuiz = null;
    });
  }
}
