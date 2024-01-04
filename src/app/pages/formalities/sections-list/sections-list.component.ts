import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Subject} from "rxjs";
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

  @Output() modulesClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('offcanvas') offcanvas!: TemplateRef<any>;

  constructor(private offcanvasService: NgbOffcanvas) {
  }

  ngOnInit(): void {
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
    this.modulesClick.next(true);
  }

  modulesCompleted(): boolean {
    return this.courseProgressOverview?.modulesCompleted === this.courseProgressOverview?.modules?.length;
  }
}
