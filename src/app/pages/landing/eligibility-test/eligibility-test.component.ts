import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  EligibilityTestAnswer,
  EligibilityTestCheckRequest,
  EligibilityTestQuestion
} from "../../../models/eligibility-test";
import {BehaviorSubject, finalize, Subject} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EligibilityTestService} from "../../../services/eligibility-test.service";


@Component({
  selector: 'app-eligibility-test',
  templateUrl: './eligibility-test.component.html',
  styleUrls: ['./eligibility-test.component.scss']
})
export class EligibilityTestComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  questions: EligibilityTestQuestion[] = [];

  currentQuestionIndex: number = 0;
  currentQuestion!: EligibilityTestQuestion;

  givenAnswers: EligibilityTestAnswer[] = [];

  testCompleted: boolean = false;
  testSubmitted: boolean = false;

  testAnswersForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(
    private securityKnowledgeTestService: EligibilityTestService
  ) {

  }

  ngOnInit(): void {
    this.securityKnowledgeTestService.getQuestions().subscribe((questions) => {
      this.questions = questions;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get completedPercent() {
    return (this.currentQuestionIndex / this.questions.length) * 100;
  }

  nextQuestion(answer: EligibilityTestAnswer) {
    this.givenAnswers.push(answer);

    this.currentQuestionIndex += 1;
    if (this.currentQuestionIndex > this.questions.length - 1) {
      this.testCompleted = true;
    }
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }

  onSubmit(): void {
    const data = this.testAnswersForm.value as EligibilityTestCheckRequest;
    data.answers = this.givenAnswers.map(a => a.letter);

    this.isLoading$.next(true);
    this.securityKnowledgeTestService.check(data).pipe(
      finalize(() => this.isLoading$.next(false))
    ).subscribe({
      next: () => {
        this.testSubmitted = true;
      }, error: () => {
        // todo: handle this case
        this.testSubmitted = true;
      }
    });

  }
}
