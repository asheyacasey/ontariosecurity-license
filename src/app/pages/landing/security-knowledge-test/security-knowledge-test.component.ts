import {Component, OnInit} from '@angular/core';

export interface KnowledgeTestAnswer {
  letter: string;
  answer: string;
}

export interface KnowledgeTestQuestion {
  question: string;
  answers: KnowledgeTestAnswer[];
}

const QUESTIONS: KnowledgeTestQuestion[] = [
  {
    question: 'How old are you?',
    answers: [
      {
        letter: 'A',
        answer: '16 or less'
      }, {
        letter: 'B',
        answer: '17'
      }, {
        letter: 'C',
        answer: '18',
      }, {
        letter: 'D',
        answer: '19 or more'
      }
    ]
  },
  {
    question: 'Do you have a CPR Certificate?',
    answers: [
      {
        letter: 'A',
        answer: 'Yes'
      }, {
        letter: 'B',
        answer: 'No'
      }
    ]
  },
  {
    question: 'Which of the following do you have?',
    answers: [
      {
        letter: 'A',
        answer: 'Canadian Passport'
      }, {
        letter: 'B',
        answer: 'Permanent Resident Card (PR)'
      }, {
        letter: 'C',
        answer: 'Work Permit',
      }, {
        letter: 'D',
        answer: 'Study Permit'
      }, {
        letter: 'E',
        answer: 'Canadian Birth Certificate'
      }
    ]
  },
  {
    question: 'Do you have a clean criminal record?',
    answers: [
      {
        letter: 'A',
        answer: 'Yes'
      }, {
        letter: 'B',
        answer: 'No'
      }, {
        letter: 'C',
        answer: 'I don\'t know',
      }
    ]
  },
  {
    question: 'Were you ever licensed in another Canadian province?',
    answers: [
      {
        letter: 'A',
        answer: 'Yes'
      }, {
        letter: 'B',
        answer: 'No'
      }
    ]
  },
  {
    question: 'Do you have any previous security guard experience?',
    answers: [
      {
        letter: 'A',
        answer: 'Yes'
      }, {
        letter: 'B',
        answer: 'No'
      }
    ]
  },
]

@Component({
  selector: 'app-security-knowledge-test',
  templateUrl: './security-knowledge-test.component.html',
  styleUrls: ['./security-knowledge-test.component.scss']
})
export class SecurityKnowledgeTestComponent implements OnInit {

  currentQuestionIndex: number = 0;
  currentQuestion!: KnowledgeTestQuestion;
  completed: boolean = false;

  constructor() {

  }

  ngOnInit(): void {
    this.currentQuestion = QUESTIONS[this.currentQuestionIndex];
  }

  get completedPercent() {
    return (this.currentQuestionIndex / QUESTIONS.length) * 100;
  }

  nextQuestion() {
    this.currentQuestionIndex += 1;
    if (this.currentQuestionIndex > QUESTIONS.length - 1) {
      this.completed = true;
    }
    this.currentQuestion = QUESTIONS[this.currentQuestionIndex];
  }
}
