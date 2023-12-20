import { Component, OnInit } from '@angular/core';
import {CourseProgressOverviewService} from "../../../services/course-progress-overview.service";
import {CourseProgressOverview} from "../../../models/course";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss', '../../../shared/shared.scss', '../../../shared/course-card.scss']
})
export class CoursesComponent implements OnInit {

  courses: CourseProgressOverview[] = [];

  constructor(private courseProgressOverviewService: CourseProgressOverviewService) { }

  ngOnInit(): void {
    this.courseProgressOverviewService.getAll().subscribe((courses) => {
      this.courses = courses;
    });
  }

}
