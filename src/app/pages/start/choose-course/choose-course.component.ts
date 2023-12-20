import {Component, OnInit} from '@angular/core';
import {CourseOverviewService} from "../../../services/course-overview.service";
import {SelectableCourseOverview} from "./selectable-course-overview";
import {CourseOverview} from "../../../models/course";
import {CartService} from "../../../services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-choose-course',
  templateUrl: './choose-course.component.html',
  styleUrls: ['./choose-course.component.scss', '../../../shared/shared.scss', '../../../shared/course-card.scss']
})
export class ChooseCourseComponent implements OnInit {

  courses: SelectableCourseOverview[] = [];
  selectedCourse: SelectableCourseOverview | null = null;

  constructor(
    private router: Router,
    private courseOverviewService: CourseOverviewService,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.courseOverviewService.getAll().subscribe((courses: CourseOverview[]) => {
      this.courses = courses.map((c) => {
        const selectable = c as SelectableCourseOverview;
        selectable.selected = false;
        return selectable;
      });
    });
  }

  onCourseSelected(course: SelectableCourseOverview): void {
    this.selectedCourse = course;
    this.courses.forEach(c => {
      c.selected = c.id === course.id;
    })
  }

  onPurchaseCourse(course: SelectableCourseOverview): void {
    this.cartService.addCourse(course as CourseOverview);
    this.router.navigate(['/start', 'pay']);
  }

}
