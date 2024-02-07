import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subject, take, takeUntil} from "rxjs";
import {NgbModal, NgbOffcanvas, NgbOffcanvasRef} from "@ng-bootstrap/ng-bootstrap";
import {Language} from "../../../models/language";
import {LanguageService} from "../../../services/language.service";
import {FaqService} from "../../../services/faq.service";
import {LandingRegisterModalComponent} from "../register-modal/landing-register-modal.component";

export interface Course {
  icon: string;
  title: string;
  price: string
}

const COURSES: {[key: string]: Course} = {
  'false': {
    icon: '/assets/course-1-icon.png',
    title: 'Security Guard & CPR Training Course',
    price: '199.99'
  },
  'true': {
    icon: '/assets/course-2-icon.png',
    title: 'Security Guard Training Course',
    price: '99.99'
  }
}

@Component({
  selector: 'app-landing-v3',
  templateUrl: './landing-v3.component.html',
  styleUrls: ['./landing-v3.component.scss']
})
export class LandingV3Component implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('offcanvas') offcanvas!: TemplateRef<any>;

  @ViewChild('testimonials') testimonials!: ElementRef<HTMLElement>;
  @ViewChild('courses') courses!: ElementRef<HTMLElement>;
  // @ViewChild('requirements') requirements!: ElementRef<HTMLElement>;
  @ViewChild('whyUs') whyUs!: ElementRef<HTMLElement>;
  @ViewChild('internationalStudents') internationalStudents!: ElementRef<HTMLElement>;
  @ViewChild('faq') faq!: ElementRef<HTMLElement>;
  @ViewChild('signUp') signUp!: ElementRef<HTMLElement>;

  offcanvasRef: NgbOffcanvasRef | null = null;

  currentCourse: Course = COURSES['false'];

  faqLanguages: Language[] = [];
  faqLanguage: Language | null = null;

  constructor(
    private router: Router,
    private offcanvasService: NgbOffcanvas,
    private modalService: NgbModal,
    private languageService: LanguageService,
    private faqService: FaqService
  ) {
  }

  ngOnInit(): void {
    this.languageService.language$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(language => {
      this.faqLanguage = language;
    })
    this.faqLanguage = this.languageService.getLanguage();
    this.faqLanguages = this.faqService.languages;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
      this.scrollTo(this.testimonials.nativeElement);
    })
  }

  goToCourses() {
    this.closeOffcanvasCallback(() => {
      this.scrollTo(this.courses.nativeElement);
    })
  }

  // goToLicenseRequirements() {
  //   this.closeOffcanvasCallback(() => {
  //     this.scrollTo(this.requirements.nativeElement);
  //   })
  // }

  goToWhyUs() {
    this.closeOffcanvasCallback(() => {
      this.scrollTo(this.whyUs.nativeElement);
    })
  }

  goToInternationalStudents() {
    this.closeOffcanvasCallback(() => {
      this.scrollTo(this.internationalStudents.nativeElement);
    })
  }

  goToFAQ(): void {
    this.closeOffcanvasCallback(() => {
      this.scrollTo(this.faq.nativeElement);
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

  scrollTo(element: HTMLElement): void {
    element.scrollIntoView({behavior: 'smooth'});
  }

  onFAQLanguageChanged(language: Language) {
    this.languageService.setLanguage(language);
  }

  changeCourseType($event: Event) {
    this.currentCourse = COURSES[(($event.target as HTMLInputElement).checked.toString())]
  }
}
