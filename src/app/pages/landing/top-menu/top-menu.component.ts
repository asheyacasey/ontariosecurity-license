import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal, NgbOffcanvas, NgbOffcanvasRef} from "@ng-bootstrap/ng-bootstrap";
import {Observable, take} from "rxjs";
import {LandingRegisterModalComponent} from "../register-modal/landing-register-modal.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  @Input() testimonialsAction: CallableFunction = () => {
    this.router.navigate(['/testimonials']);
  }
  @Input() courseAction: CallableFunction = () => {
    this.router.navigate(['/course']);
  }
  @Input() guaranteeAction: CallableFunction = () => {
    this.router.navigate(['/guarantee']);
  }
  @Input() inPersonAction: CallableFunction = () => {
    this.router.navigate(['/in-person'])
  }
  @Input() whyUsAction: CallableFunction = () => {
    this.router.navigate(['/why-us'])
  }
  @Input() internationStudentsAction: CallableFunction = () => {
    this.router.navigate(['/international-students'])
  }
  @Input() faqAction: CallableFunction = () => {
    this.router.navigate(['/faq'])
  }

  @ViewChild('offcanvas') offcanvas!: TemplateRef<any>;

  offcanvasRef: NgbOffcanvasRef | null = null;

  constructor(
    private router: Router,
    private offcanvasService: NgbOffcanvas,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  onMenuClicked(): void {
    this.offcanvasRef = this.offcanvasService.open(this.offcanvas);
  }

  closeOffcanvas(): Observable<void> | null {
    if (this.offcanvasRef) {
      const observable = this.offcanvasRef.hidden;
      this.offcanvasRef.close();
      this.offcanvasRef = null;
      return observable;
    }
    return null;
  }

    closeOffcanvasCallback(callback: CallableFunction): void {
    const hiddenObservable = this.closeOffcanvas();
    if (hiddenObservable) {
      hiddenObservable.pipe(
        take(1)
      ).subscribe(() => {
        callback();
      })
    } else {
      callback();
    }
  }

    goToTestimonials() {
    this.closeOffcanvasCallback(() => {
      this.testimonialsAction();
    })
  }

  goToCourses() {
    this.closeOffcanvasCallback(() => {
      this.courseAction();
    })
  }

  goToWhyUs() {
    this.closeOffcanvasCallback(() => {
      this.whyUsAction();
    })
  }

  goToInternationalStudents() {
    this.closeOffcanvasCallback(() => {
      this.internationStudentsAction();
    })
  }

  goToFAQ(): void {
    this.closeOffcanvasCallback(() => {
      this.faqAction();
    });
  }

  goToLogin(): void {
    this.closeOffcanvasCallback(() => {
      this.router.navigate(['/login']);
    });
  }

  goToSignUp(): void {
    this.closeOffcanvasCallback(() => {
      this.modalService.open(LandingRegisterModalComponent, {size: 'lg'});
    });
  }

}
