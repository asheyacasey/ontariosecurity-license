import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, ReplaySubject, Subject, tap} from "rxjs";
import {CourseProgressModule} from "../models/course";
import {LinkedLecture} from "../models/lecture";
import {LinkedQuiz, QuizAnswers, QuizProgressDetails, QuizResult} from "../models/quiz";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class LearnService {
  private apiUrl: string = environment.apiUrl;

  private _courseId$$: Subject<number> = new ReplaySubject<number>(1);
  readonly courseId$ = this._courseId$$.asObservable();

  private _moduleId$$: Subject<number | null> = new BehaviorSubject<number | null>(null);
  readonly moduleId$ = this._moduleId$$.asObservable();

  private _lectureId$$: Subject<number | null> = new BehaviorSubject<number | null>(null);
  readonly lectureId$ = this._lectureId$$.asObservable();

  private _quizId$$: Subject<number | null> = new BehaviorSubject<number | null>(null);
  readonly quizId$ = this._quizId$$.asObservable();

  private _courseModules$$: Subject<CourseProgressModule[]> = new BehaviorSubject<CourseProgressModule[]>([]);
  readonly courseModules$ = this._courseModules$$.asObservable();

  // todo: refactor into tuple [number, boolean]
  private _moduleIdCompleted$$: Subject<number> = new Subject<number>();
  readonly moduleIdCompleted$ = this._moduleIdCompleted$$.asObservable();

  private _moduleIdNotCompleted$$: Subject<number> = new Subject<number>();
  readonly moduleIdNotCompleted$ = this._moduleIdNotCompleted$$.asObservable();

  private _courseCompleted$$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  readonly courseCompleted$ = this._courseCompleted$$.asObservable();

  private _title$$: Subject<string | null> = new BehaviorSubject<string | null>(null);
  readonly title$ = this._title$$.asObservable();

  private _lectureIdLoaded$$: Subject<number> = new Subject<number>();
  readonly lectureIdLoaded$ = this._lectureIdLoaded$$.asObservable();

  private _requiredCourseTimeReached$$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  readonly requiredCourseTimeReached$ = this._requiredCourseTimeReached$$.asObservable();

  // current course ID
  courseId?: number;

  // current module ID
  moduleId?: number;

  // current lecture ID
  lectureId?: number;

  // current quiz ID
  quizId?: number;

  constructor(private titleService: Title, private http: HttpClient) {
  }

  setCourseId(courseId: number): void {
    if (this.courseId !== courseId) {
      this.courseId = courseId;
      this._courseId$$.next(courseId);
    }
  }

  setModuleId(moduleId: number): void {
    if (this.moduleId !== moduleId) {
      this.moduleId = moduleId;
      this._moduleId$$.next(moduleId);
    }
  }

  setModuleIdCompleted(moduleId: number): void {
    this._moduleIdCompleted$$.next(moduleId);
  }

  setModuleIdNotCompleted(moduleId: number): void {
    this._moduleIdNotCompleted$$.next(moduleId);
  }

  setLectureId(lectureId: number) {
    if (this.lectureId !== lectureId) {
      this.lectureId = lectureId;
      this._lectureId$$.next(lectureId);
    }
  }

  setLectureIdLoaded(lectureId: number) {
    this._lectureIdLoaded$$.next(lectureId);
  }

  setQuizId(quizId: number) {
    if (this.quizId !== quizId) {
      this.quizId = quizId;
      this._quizId$$.next(quizId);
    }
  }

  setTitle(title: string) {
    this._title$$.next(title);
    this.titleService.setTitle(`${title} | Ontario Security License`);
  }

  setCourseTimeReached() {
    this._requiredCourseTimeReached$$.next(true);
  }

  setCourseTimeNotReached() {
    this._requiredCourseTimeReached$$.next(false);
  }

  setCourseCompleted() {
    this._courseCompleted$$.next(true);
  }

  setCourseNotCompleted() {
    this._courseCompleted$$.next(false);
  }

  // todo: move to ModulesService
  getCourseModules(courseId: number): Observable<CourseProgressModule[]> {
    return this.http.get<CourseProgressModule[]>(`${this.apiUrl}/course/${courseId}/modules`).pipe(
      tap((courseModules) => {
        this._courseModules$$.next(courseModules);
      })
    );
  }

  getLecture(lectureId: number): Observable<LinkedLecture> {
    return this.http.get<LinkedLecture>(`${this.apiUrl}/course/${this.courseId}/lecture/${lectureId}`).pipe(
      tap(() => this.setLectureIdLoaded(lectureId))
    );
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
