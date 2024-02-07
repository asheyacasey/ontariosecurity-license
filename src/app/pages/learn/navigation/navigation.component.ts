import {Component, Input, OnInit} from '@angular/core';
import {LinkedLecture, LinkedLectureIterator, LinkedQuizIterator} from "../../../models/lecture";
import {Router} from "@angular/router";
import {LearnService} from "../../../services/learn.service";
import {Subject, takeUntil} from "rxjs";
import {CourseProgressModule} from "../../../models/course";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() previousLecture: LinkedLectureIterator | null = null;
  @Input() previousQuiz: LinkedQuizIterator | null = null;
  @Input() nextLecture: LinkedLectureIterator | null = null;
  @Input() nextQuiz: LinkedQuizIterator | null = null;
  @Input() lectureIds: number[] = [];
  @Input() currentLectureId: number | null = null;

  modules: CourseProgressModule[] = [];

  constructor(
    private learnService: LearnService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.learnService.courseModules$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((modules) => {
      this.modules = modules;
    })
  }

  hasPrevious(): boolean {
    return !!this.previousLecture || !!this.previousQuiz;
  }

  previous(): void {
    const previousLectureId = this.previousLecture?.id;
    if (previousLectureId) {
      this.goToLectureId(previousLectureId);
    }
    const previousQuizId = this.previousQuiz?.id;
    if (previousQuizId) {
      this.goToQuizId(previousQuizId)
    }
  }

  hasNext() {
    return !!this.nextLecture || !!this.nextQuiz;
  }

  next(): void {
    if (this.nextIsLocked()) {
      return;
    }

    const nextLectureId = this.nextLecture?.id;
    if (nextLectureId) {
      this.goToLectureId(nextLectureId);
    }
    const nextQuizId = this.nextQuiz?.id;
    if (nextQuizId) {
      this.goToQuizId(nextQuizId);
    }

  }

  nextIsLocked(): boolean {
    if(!this.nextLecture) {
      return false;
    }

    const nextModule = this.modules.find(m => m.lectureIds.includes(this.nextLecture?.id as number));
    if (!nextModule) {
      return false;
    }

    return nextModule.locked;
  }

  goToLectureId(lectureId: number): void {
    this.router.navigate(['/learn', this.learnService.courseId, 'lecture', lectureId]);
  }

  goToQuizId(quizId: number): void {
    this.router.navigate(['/learn', this.learnService.courseId, 'quiz', quizId]);
  }
}
