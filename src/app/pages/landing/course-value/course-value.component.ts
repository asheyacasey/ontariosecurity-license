import {Component, OnInit} from '@angular/core';

export interface CourseValue {
  value: string;
  free: boolean
}

const VALUES: CourseValue[] = [
  {
    value: 'Live Instructor Helpline to Answer Any Questions in Real Time',
    free: true
  }, {
    value: '12 Practice Quizzes',
    free: true,
  }, {
    value: 'Insider Access to Companies & Jobs Not Advertised Publicly',
    free: true
  }, {
    value: 'Proprietary Security Guard Resume Builder ($49 value)',
    free: true,
  }, {
    value: '1 Day CPR Training Near You (if needed)',
    free: false
  }, {
    value: 'Assistance with Completing Forms and License Application',
    free: true
  }, {
    value: 'Discounted Members-only Pricing for more Courses ($633 in savings)',
    free: false
  }, {
    value: 'Content and Support Available in Hindi, Punjabi & Farsi',
    free: true
  }
];

@Component({
  selector: 'app-course-value',
  templateUrl: './course-value.component.html',
  styleUrls: ['./course-value.component.scss']
})
export class CourseValueComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  getValues(): CourseValue[] {
    return VALUES;
  }

}
