import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectableCourseOverview} from "../../models/selectable-course-overview";

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss', '../../shared/shared.scss', '../../shared/course-card.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course!: SelectableCourseOverview
  @Input() selected: boolean = false;
  @Output() courseClicked = new EventEmitter<SelectableCourseOverview>();

  constructor() { }

  ngOnInit(): void {
  }

  clicked(): void {
    this.courseClicked.next(this.course);
  }

  formatCourseLanguages(course: SelectableCourseOverview): string {
    return course.availableInLanguages.map(l => l.name).join(', ');
  }

}
