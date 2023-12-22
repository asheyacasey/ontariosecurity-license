import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, ReplaySubject, Subject} from "rxjs";
import {CourseProgressModule, CourseTimer} from "../models/course";
import {LinkedLecture} from "../models/lecture";
import {LinkedQuiz, QuizAnswers, QuizProgressDetails, QuizResult} from "../models/quiz";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

const MODULES: CourseProgressModule[] = [
  {
    id: 1,
    moduleNumber: 1,
    name: 'Test module',
    completed: false,
    lectureIds: [1, 2, 3]
  },
  {
    id: 2,
    moduleNumber: 2,
    name: 'Second test module',
    completed: false,
    lectureIds: [4, 5, 6]
  },
  {
    id: 3,
    moduleNumber: 3,
    name: 'Third test module',
    completed: false,
    lectureIds: [7, 8, 9]
  },
];

const LECTURES: { [id: number]: LinkedLecture } = {
  1: {
    id: 1,
    lectureNumber: 1,
    name: 'Test 1',
    content: 'Test content 1',
    module: {
      id: 1,
      lectureIds: [1, 2, 3],
      hasQuiz: true,
      quizId: 1,
    },
    nextLecture: {
      id: 2,
      moduleId: 1
    }
  },
  2: {
    id: 2,
    lectureNumber: 2,
    name: 'Test 2',
    content: 'Test content 2',
    module: {
      id: 1,
      lectureIds: [1, 2, 3],
      hasQuiz: true,
      quizId: 1,
    },
    previousLecture: {
      id: 1,
      moduleId: 1,
    },
    nextLecture: {
      id: 3,
      moduleId: 1
    }
  },
  3: {
    id: 3,
    lectureNumber: 3,
    name: 'Test 3',
    content: 'Test content 3',
    module: {
      id: 1,
      lectureIds: [1, 2, 3],
      hasQuiz: true,
      quizId: 1,
    },
    previousLecture: {
      id: 2,
      moduleId: 1,
    },
    nextQuiz: {
      id: 1,
      moduleId: 1
    }
  },
  4: {
    id: 4,
    lectureNumber: 1,
    name: 'Test 41',
    content: 'Test content 41',
    module: {
      id: 2,
      hasQuiz: false,
      lectureIds: [4]
    },
    previousQuiz: {
      id: 1,
      moduleId: 1,
    },
  },
};

const QUIZ: LinkedQuiz = {
  id: 2,
  questionsNumber: 6,
  module: {
    id: 1,
    lectureIds: [1, 2, 3],
    hasQuiz: true,
    quizId: 1,
  },
  previousLecture: {
    id: 3,
    moduleId: 1,
  },
  nextLecture: {
    id: 4,
    moduleId: 2
  }
};

const DETAILS: QuizProgressDetails = {
  identifier: '250bb3ac-2897-40b6-9a22-75d62f34c8f9',
  moduleQuiz: {
    questions: [
      {
        id: 1,
        questionNumber: 1,
        multiSelection: false,
        text: 'What is that?',
        answers: [
          {
            id: 1,
            answerNumber: 1,
            text: 'First answer'
          },
          {
            id: 2,
            answerNumber: 2,
            text: 'Second answer'
          }
        ]
      },
      {
        id: 2,
        questionNumber: 2,
        multiSelection: true,
        text: 'What is the other thing?',
        answers: [
          {
            id: 3,
            answerNumber: 1,
            text: 'First answer for the second question'
          },
          {
            id: 4,
            answerNumber: 2,
            text: 'Second answer for the second question'
          }
        ]
      }
    ]
  }
}

@Injectable({
  providedIn: 'root'
})
export class LearnService {

  courseId?: number;
  moduleId?: number;
  lectureId?: number;
  quizId?: number;

  courseId$: Subject<number> = new ReplaySubject<number>(1);
  moduleId$: Subject<number | null> = new BehaviorSubject<number | null>(null);
  lectureId$: Subject<number | null> = new BehaviorSubject<number | null>(null);
  quizId$: Subject<number | null> = new BehaviorSubject<number | null>(null);

  moduleIdCompleted$: Subject<number> = new Subject<number>();
  moduleIdNotCompleted$: Subject<number> = new Subject<number>();

  titleSubject: Subject<string | null> = new BehaviorSubject<string | null>(null);
  title$ = this.titleSubject.asObservable();

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  setCourseId(courseId: number): void {
    if (this.courseId !== courseId) {
      this.courseId = courseId;
      this.courseId$.next(courseId);
    }
  }

  setModuleId(moduleId: number): void {
    if (this.moduleId !== moduleId) {
      this.moduleId = moduleId;
      this.moduleId$.next(moduleId);
    }
  }

  setModuleIdCompleted(moduleId: number): void {
    this.moduleIdCompleted$.next(moduleId);
  }

  setModuleIdNotCompleted(moduleId: number): void {
    this.moduleIdNotCompleted$.next(moduleId);
  }

  setLectureId(lectureId: number) {
    if (this.lectureId !== lectureId) {
      this.lectureId = lectureId;
      this.lectureId$.next(lectureId);
    }
  }

  setQuizId(quizId: number) {
    if (this.quizId !== quizId) {
      this.quizId = quizId;
      this.quizId$.next(quizId);
    }
  }

  setTitle(title: string) {
    this.titleSubject.next(title);
  }

  // todo: move to ModulesService
  getCourseModules(courseId: number): Observable<CourseProgressModule[]> {
    return this.http.get<CourseProgressModule[]>(`${this.apiUrl}/course/${courseId}/modules`);
  }

  getLecture(lectureId: number): Observable<LinkedLecture> {
    return this.http.get<LinkedLecture>(`${this.apiUrl}/course/${this.courseId}/lecture/${lectureId}`);
  }

  getQuiz(quizId: number): Observable<LinkedQuiz> {
    return this.http.get<LinkedQuiz>(`${this.apiUrl}/course/${this.courseId}/quiz/${quizId}`);
  }

  getQuizQuestions(quizId: number): Observable<QuizProgressDetails> {
    return this.http.post<QuizProgressDetails>(`${this.apiUrl}/course/${this.courseId}/quiz/${quizId}/start`, {});
  }

  sendQuizAnswers(quizId: number, quizAnswers: QuizAnswers): Observable<QuizResult> {
    return this.http.post<QuizResult>(`${this.apiUrl}/course/${this.courseId}/quiz/${quizId}/check`, quizAnswers);
  }
}
