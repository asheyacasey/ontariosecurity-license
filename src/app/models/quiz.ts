import {LinkedLectureIterator, LinkedLectureModule} from "./lecture";

export interface LinkedQuiz {
  id: number;
  questionsNumber: number;

  module: LinkedLectureModule;

  previousLecture?: LinkedLectureIterator;
  nextLecture?: LinkedLectureIterator;
}

export interface LinkedQuizModule extends LinkedLectureModule {

}
