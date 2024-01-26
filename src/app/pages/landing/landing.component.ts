import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject} from "rxjs";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss', '../../shared/shared.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>()

  @ViewChild('offcanvas') offcanvas!: TemplateRef<any>;

  constructor(private offcanvasService: NgbOffcanvas) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onHamburgerClicked(): void {
    this.openOffcanvas();
  }

  openOffcanvas(): void {
    this.offcanvasService.open(this.offcanvas);
  }

  closeOffcanvas(): void {
    this.offcanvasService.dismiss();
  }
}
