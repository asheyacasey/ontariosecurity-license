import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, ReplaySubject, Subject, tap} from "rxjs";
import {CourseProgressModule} from "../models/course";
import {LinkedLecture} from "../models/lecture";
import {LinkedQuiz, QuizAnswers, QuizProgressDetails, QuizResult} from "../models/quiz";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Title} from "@angular/platform-browser";
import {Language} from "../models/language";
import {LanguageService} from "./language.service";

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

  private _quizIdCompleted$$: Subject<number> = new Subject<number>();
  readonly quizIdCompleted$ = this._quizIdCompleted$$.asObservable();

  private _courseModules$$: Subject<CourseProgressModule[]> = new BehaviorSubject<CourseProgressModule[]>([]);
  readonly courseModules$ = this._courseModules$$.asObservable();

  private _courseCompleted$$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  readonly courseCompleted$ = this._courseCompleted$$.asObservable();

  private _title$$: Subject<string | null> = new BehaviorSubject<string | null>(null);
  readonly title$ = this._title$$.asObservable();

  private _lectureIdLoaded$$: Subject<number> = new Subject<number>();
  readonly lectureIdLoaded$ = this._lectureIdLoaded$$.asObservable();

  private _requiredModuleTimeReached$$: Subject<number> = new Subject<number>();
  readonly requiredModuleTimeReached$ = this._requiredModuleTimeReached$$.asObservable();

  // current course ID
  courseId?: number;

  // current module ID
  moduleId?: number;

  // current lecture ID
  lectureId?: number;

  // current quiz ID
  quizId?: number;

  constructor(
    private titleService: Title,
    private http: HttpClient,
    private languageService: LanguageService
  ) {
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

  setQuizIdCompleted(quizId: number): void {
    this._quizIdCompleted$$.next(quizId);
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

  setCourseCompleted(completed: boolean) {
    this._courseCompleted$$.next(completed);
  }

  setRequiredModuleTimeReached(moduleId: number) {
    this._requiredModuleTimeReached$$.next(moduleId);
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
    const params = new HttpParams()
      .set('language', this.languageService.getLanguage().code);

    return this.http.get<LinkedLecture>(
      `${this.apiUrl}/course/${this.courseId}/lecture/${lectureId}`, {params}
    ).pipe(
      tap(() => this.setLectureIdLoaded(lectureId))
    );
  }

  getQuiz(quizId: number): Observable<LinkedQuiz> {
    return this.http.get<LinkedQuiz>(`${this.apiUrl}/course/${this.courseId}/quiz/${quizId}`);
  }

  getQuizQuestions(quizId: number): Observable<QuizProgressDetails> {
    return this.http.post<QuizProgressDetails>(
      `${this.apiUrl}/course/${this.courseId}/quiz/${quizId}/start`, {});
  }

  sendQuizAnswers(quizId: number, quizAnswers: QuizAnswers): Observable<QuizResult> {
    return this.http.post<QuizResult>(`${this.apiUrl}/course/${this.courseId}/quiz/${quizId}/check`, quizAnswers);
  }
}
