import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {SelectableCourseProgressModule} from "../selectable-course-progress-module";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {Subject, takeUntil} from "rxjs";
import {TimeFormatterService} from "../../../services/time-formatter.service";

@Component({
  selector: 'app-modules-list',
  templateUrl: './modules-list.component.html',
  styleUrls: ['./modules-list.component.scss', '../../../shared/shared.scss']
})
export class ModulesListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() modules!: SelectableCourseProgressModule[];
  @Input() openMenu$!: Subject<boolean>;
  @Input() canClickNextSteps!: boolean | null;
  @Output() selectedModuleChanged = new EventEmitter<SelectableCourseProgressModule>();
  @Output() nextStepsClicked = new EventEmitter<boolean>();

  @ViewChild('offcanvas') offcanvas!: TemplateRef<any>;

  constructor(
    private offcanvasService: NgbOffcanvas,
    public timeFormatterService: TimeFormatterService
  ) {
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

  onSelectionChange(module: SelectableCourseProgressModule): void {
    this.closeOffcanvas();
    if (!module.locked) {
      this.selectedModuleChanged.next(module);
    }
  }

  openOffcanvas(): void {
    this.offcanvasService.open(this.offcanvas);
  }

  closeOffcanvas(): void {
    this.offcanvasService.dismiss();
  }

  onNextStepsClick(): void {
    if (this.canClickNextSteps) {
      this.closeOffcanvas();
      this.nextStepsClicked.next(true);
    }
  }
}
