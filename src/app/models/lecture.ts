export interface LinkedLecture {
  id: number;
  lectureNumber: number;
  name: string;
  content: string;

  module: LinkedLectureModule;

  previousLecture?: LinkedLectureIterator;
  nextLecture?: LinkedLectureIterator;

  previousQuiz?: LinkedQuizIterator;
  nextQuiz?: LinkedLectureIterator;
}

export interface LinkedLectureModule {
  id: number;
  lectureIds: number[];
  hasQuiz: boolean;
  quizId?: number;
  video?: string;
}

export interface LinkedLectureIterator {
  id: number;
  moduleId: number;
}

export interface LinkedQuizIterator {
  id: number;
  moduleId: number;
}
