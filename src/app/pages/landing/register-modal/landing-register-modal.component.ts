import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {LandingRegisterComponent} from "../register/landing-register.component";
import {Subject, takeUntil} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-landing-register-modal',
  templateUrl: './landing-register-modal.component.html',
  styleUrls: ['./landing-register-modal.component.scss']
})
export class LandingRegisterModalComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(LandingRegisterComponent) register!: LandingRegisterComponent;

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      takeUntil(this.destroy$)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeModal.close('Navigation');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
