import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, Subject, takeUntil} from "rxjs";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseProgressOverviewService} from "../../services/course-progress-overview.service";
import {CourseProgressOverview} from "../../models/course";

@Component({
  selector: 'app-formalities',
  templateUrl: './formalities.component.html',
  styleUrls: ['./formalities.component.scss']
})
export class FormalitiesComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  openMenu$: Subject<boolean> = new Subject<boolean>();
  courseProgressOverview?: CourseProgressOverview;

  courseId?: number;

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private courseProgressOverviewService: CourseProgressOverviewService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      this.courseId = Number(params['courseId']);

      this.courseProgressOverviewService.getById(this.courseId).subscribe((progress) => {
        if (progress) {
          this.courseProgressOverview = progress;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openMenu(): void {
    this.openMenu$.next(true);
  }

  goToCourse(): void {
    this.router.navigate(['/learn', this.courseId]);
  }

}
