import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SelectableCourseProgressModule} from "../../selectable-course-progress-module";
import {QuizResultAnswer} from "../../../../models/quiz";
import {Subject} from "rxjs";

@Component({
  selector: 'app-quiz-question-check',
  templateUrl: './quiz-question-check.component.html',
  styleUrls: ['./quiz-question-check.component.scss']
})
export class QuizQuestionCheckComponent implements OnInit, OnDestroy {
    destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() answer!: QuizResultAnswer;
  @Input() questionNumber!: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  isMultiselect(): boolean {
    return this.answer.correctAnswers.length > 1;
  }

  answerIsChecked(possibleAnswer: string): boolean {
    return this.answer.givenAnswers.indexOf(possibleAnswer) > -1;
  }

  answerIsCorrect(possibleAnswer: string): boolean {
    return this.answer.correctAnswers.indexOf(possibleAnswer) > -1;
  }

  questionIsCorrect(): boolean {
    return this.answer.givenAnswers.sort().join(',') === this.answer.correctAnswers.sort().join(',');
  }

  getTooltipText(possibleAnswer: string): string {
    if (this.answerIsChecked(possibleAnswer) && this.answerIsCorrect(possibleAnswer)) {
      // correct answer given
      return 'You have selected the correct answer';
    }

    if (this.answerIsChecked(possibleAnswer) && !this.answerIsCorrect(possibleAnswer)) {
      // incorrect answer given
      return 'You have selected this answer, but it is not the right one'
    }

    if (!this.answerIsChecked(possibleAnswer) && this.answerIsCorrect(possibleAnswer)) {
      // not selected while it should be
      return 'You have not selected this answer, while it is the right one';
    }

    return '';
  }
}
