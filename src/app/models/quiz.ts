import {LinkedLectureIterator, LinkedLectureModule} from "./lecture";

export interface LinkedQuiz {
  id: number;
  questionsNumber: number;

  module: LinkedLectureModule;
  result?: QuizResult;

  previousLecture?: LinkedLectureIterator;
  nextLecture?: LinkedLectureIterator;
}

export interface QuizResultAnswer {
  question: string;
  possibleAnswers: string[];
  correctAnswers: string[];
  givenAnswers: string[];
}

export interface QuizResult {
  passed: boolean;
  resultPercent: number;
  requiredPercent: number;
  answers: QuizResultAnswer[];
  isReviewable: boolean;
}

export interface LinkedQuizModule extends LinkedLectureModule {

}

export interface QuizProgressDetails {
  identifier: string;
  moduleQuiz: QuizDetails;
}

export interface QuizDetails {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  questionNumber: number;
  multiSelection: boolean;
  text: string;
  answers: QuizQuestionAnswer[];
}

export interface QuizQuestionAnswer {
  id: number;
  answerNumber: number;
  text: string;
}

// for on click option change event
export interface QuizQuestionAnswerChange {
  questionId: number;
  answerId: number;
  multiSelection: boolean;
  checked: boolean;
}

// for formulating a request
export interface QuizAnswers {
  identifier: string;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  questionId: number;
  answerIds: number[];
}
