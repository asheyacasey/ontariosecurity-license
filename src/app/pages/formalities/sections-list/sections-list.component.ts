import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {CourseProgressOverview} from "../../../models/course";
import {FormalityService} from "../../../services/formality.service";
import {FormalitiesStatus} from "../../../models/formality";

@Component({
  selector: 'app-sections-list',
  templateUrl: './sections-list.component.html',
  styleUrls: ['./sections-list.component.scss']
})
export class SectionsListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() formalitiesStatus?: FormalitiesStatus;
  @Input() openMenu$!: Subject<boolean>;

  @Output() modulesClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('offcanvas') offcanvas!: TemplateRef<any>;

  status: FormalitiesStatus | null = null;

  constructor(private offcanvasService: NgbOffcanvas, private formalityService: FormalityService) {
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

    this.formalityService.formalitiesStatus$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(status => {
      this.status = status;
    })
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
}
