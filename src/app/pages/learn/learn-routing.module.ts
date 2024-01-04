import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LearnComponent} from "./learn.component";
import {LectureComponent} from "./lecture/lecture.component";
import {QuizComponent} from "./quiz/quiz.component";
import {RedirectComponent} from "./redirect/redirect.component";

const routes: Routes = [
  {
    path: ':courseId',
    component: LearnComponent,
    // todo: add guard
    children: [
      {
        path: '',
        component: RedirectComponent
      },
      {
        path: 'lecture/:lectureId',
        component: LectureComponent
      },
      {
        path: 'quiz/:quizId',
        component: QuizComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnRoutingModule {
}
