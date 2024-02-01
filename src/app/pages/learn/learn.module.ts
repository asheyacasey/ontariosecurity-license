import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LearnComponent} from './learn.component';
import {LectureComponent} from './lecture/lecture.component';
import {QuizComponent} from './quiz/quiz.component';
import {LearnRoutingModule} from "./learn-routing.module";
import {PartialsModule} from "../../partials/partials.module";
import {ModulesListComponent} from './modules-list/modules-list.component';
import {CourseTimerComponent} from './course-timer/course-timer.component';
import {NavigationComponent} from './navigation/navigation.component';
import {TitleComponent} from './title/title.component';
import {QuizQuestionComponent} from './quiz/quiz-question/quiz-question.component';
import {RedirectComponent} from './redirect/redirect.component';
import { ModuleTimerComponent } from './module-timer/module-timer.component';
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    LearnComponent,
    LectureComponent,
    QuizComponent,
    ModulesListComponent,
    CourseTimerComponent,
    NavigationComponent,
    TitleComponent,
    QuizQuestionComponent,
    RedirectComponent,
    ModuleTimerComponent,
  ],
  exports: [
    ModulesListComponent
  ],
  imports: [
    CommonModule,
    LearnRoutingModule,
    PartialsModule,
    NgbTooltipModule
  ]
})
export class LearnModule {
}
