import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseBasic} from "../../../models/course";
import {SelectableCourseOverview} from "../../../models/selectable-course-overview";
import {ChooseCourseComponent} from "../../start/choose-course/choose-course.component";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: [
    '../../start/choose-course/choose-course.component.scss',
    '../../../shared/shared.scss',
    '../../../shared/course-card.scss'
  ]
})
export class CoursesListComponent extends ChooseCourseComponent implements OnInit, OnDestroy {

  override onCourseAction(course: SelectableCourseOverview): void {
    this.cartService.addCourse(course as CourseBasic);
    this.router.navigate(['/start', 'register']);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
