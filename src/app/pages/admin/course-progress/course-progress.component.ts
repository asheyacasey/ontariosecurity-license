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

  showDetails: number[] = [];

  constructor(
    public timeFormatterService: TimeFormatterService,
    searchService: AdminCourseProgressService,
    activatedRoute: ActivatedRoute,
    viewport: ViewportScroller
  ) {
    super(activatedRoute, viewport);
    this.searchService = searchService;
  }

  detailsShown(paymentId: number): boolean {
    return this.showDetails.indexOf(paymentId) > -1;
  }

  detailsHidden(paymentId: number): boolean {
    return !this.detailsShown(paymentId);
  }

  toggleShowDetails(paymentId: number): void {
    const index = this.showDetails.indexOf(paymentId);
    if (index > -1) {
      this.showDetails.splice(index, 1);
    } else {
      this.showDetails.push(paymentId);
    }
  }
}
