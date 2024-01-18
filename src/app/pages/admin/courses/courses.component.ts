import { Component } from '@angular/core';
import {AbstractListingComponent} from "../abstract-listing-component";
import {ActivatedRoute} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {PagedAdminCourses} from "../../../models/admin/course";
import {AdminCourseService} from "../../../services/admin/admin-course.service";
import {TimeFormatterService} from "../../../services/time-formatter.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent extends AbstractListingComponent<PagedAdminCourses> {

  constructor(
    public timeFormatterService: TimeFormatterService,
    searchService: AdminCourseService,
    activatedRoute: ActivatedRoute,
    viewport: ViewportScroller
  ) {
    super(activatedRoute, viewport);
    this.searchService = searchService;
  }
}
