import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {CourseProgressOverview} from "../../../models/course";

@Component({
  selector: 'app-sections-list',
  templateUrl: './sections-list.component.html',
  styleUrls: ['./sections-list.component.scss']
})
export class SectionsListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() courseProgressOverview?: CourseProgressOverview;
  @Input() openMenu$!: Subject<boolean>;

  @Output() modulesClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('offcanvas') offcanvas!: TemplateRef<any>;

  constructor(private offcanvasService: NgbOffcanvas) {
  }

  ngOnInit(): void {
    this.openMenu$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((open) => {
      if (open) {
        this.openOffcanvas();
      } else {
        this.closeOffcanvas();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openOffcanvas(): void {
    this.offcanvasService.open(this.offcanvas);
  }

  closeOffcanvas(): void {
    this.offcanvasService.dismiss();
  }

  onModulesClick() {
    this.closeOffcanvas();
    this.modulesClick.next(true);
  }

  modulesCompleted(): boolean {
    return this.courseProgressOverview?.modulesCompleted === this.courseProgressOverview?.modules?.length;
  }
}
