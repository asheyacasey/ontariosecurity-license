import {Component, OnDestroy, OnInit} from '@angular/core';
import {LinkedLecture} from "../../../models/lecture";
import {LearnService} from "../../../services/learn.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LinkedQuiz} from "../../../models/quiz";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss', '../learn.component.scss', '../navigation.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  quizId?: number;
  quiz?: LinkedQuiz;

  constructor(
    private learnService: LearnService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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

      this.learnService.getQuiz(quizId).subscribe((quiz) => {
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

}
