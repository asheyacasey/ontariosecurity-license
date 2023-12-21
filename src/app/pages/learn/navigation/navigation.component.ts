import {Component, Input, OnInit} from '@angular/core';
import {LinkedLecture, LinkedLectureIterator, LinkedQuizIterator} from "../../../models/lecture";
import {Router} from "@angular/router";
import {LearnService} from "../../../services/learn.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input() previousLecture: LinkedLectureIterator | null = null;
  @Input() previousQuiz: LinkedQuizIterator | null = null;
  @Input() nextLecture: LinkedLectureIterator | null = null;
  @Input() nextQuiz: LinkedQuizIterator | null = null;
  @Input() lectureIds: number[] = [];
  @Input() currentLectureId: number | null = null;

  constructor(
    private learnService: LearnService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
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
    const nextLectureId = this.nextLecture?.id;
    if (nextLectureId) {
      this.goToLectureId(nextLectureId);
    }
    const nextQuizId = this.nextQuiz?.id;
    if (nextQuizId) {
      this.goToQuizId(nextQuizId);
    }

  }

  goToLectureId(lectureId: number): void {
    this.router.navigate(['/learn', this.learnService.courseId, 'lecture', lectureId]);
  }

  goToQuizId(quizId: number): void {
    this.router.navigate(['/learn', this.learnService.courseId, 'quiz', quizId]);
  }

}
