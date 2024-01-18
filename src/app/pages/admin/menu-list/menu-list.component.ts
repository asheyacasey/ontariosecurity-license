import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() openMenu$!: Subject<boolean>;

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


}
