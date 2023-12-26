import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuizQuestion, QuizQuestionAnswerChange} from "../../../../models/quiz";

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss']
})
export class QuizQuestionComponent implements OnInit {

  @Input() question!: QuizQuestion;
  @Output() optionChange = new EventEmitter<QuizQuestionAnswerChange>();

  constructor() { }

  ngOnInit(): void {
  }


  onOptionChange(answerId: number, multiSelection: boolean, $event: Event) {
    const checked = ($event.target as HTMLInputElement).checked;
    this.optionChange.emit({
      questionId: this.question.id,
      answerId: answerId,
      multiSelection: multiSelection,
      checked: checked
    })
  }
}
