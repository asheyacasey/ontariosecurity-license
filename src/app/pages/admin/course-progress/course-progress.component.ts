import {Component, OnInit} from '@angular/core';
import {AbstractListingComponent} from "../abstract-listing-component";
import {ActivatedRoute} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {AdminCourseProgressService} from "../../../services/admin/admin-course-progress.service";
import {PagedAdminCourseProgress} from "../../../models/admin/course-progress";
import {TimeFormatterService} from "../../../services/time-formatter.service";

@Component({
  selector: 'app-course-progress',
  templateUrl: './course-progress.component.html',
  styleUrls: ['./course-progress.component.scss']
})
export class CourseProgressComponent extends AbstractListingComponent<PagedAdminCourseProgress> {

  constructor(
    public timeFormatterService: TimeFormatterService,
    searchService: AdminCourseProgressService,
    activatedRoute: ActivatedRoute,
    viewport: ViewportScroller
  ) {
    super(activatedRoute, viewport);
    this.searchService = searchService;
  }
}
