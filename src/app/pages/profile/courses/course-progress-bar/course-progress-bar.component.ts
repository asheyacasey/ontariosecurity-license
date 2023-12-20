import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-course-progress-bar',
  templateUrl: './course-progress-bar.component.html',
  styleUrls: ['./course-progress-bar.component.scss']
})
export class CourseProgressBarComponent implements OnInit {

  @Input() total!: number
  @Input() completed!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
