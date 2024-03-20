import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {first, Subject, takeUntil} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Language} from "../../../models/language";
import {LanguageService} from "../../../services/language.service";
import {FaqService} from "../../../services/faq.service";
import {LandingRegisterModalComponent} from "../register-modal/landing-register-modal.component";
import {ViewportScroller} from "@angular/common";

// todo: move elsewhere
export interface Course {
  icon: string;
  title: string;
  price: string
}

const COURSES: { [key: string]: Course } = {
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
  selector: 'app-landing-v4',
  templateUrl: './landing-v4.component.html',
  styleUrls: ['./landing-v4.component.scss']
})
export class LandingV4Component implements OnInit, OnDestroy, AfterViewInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  currentCourse: Course = COURSES['false'];

  faqLanguages: Language[] = [];
  faqLanguage: Language | null = null;

  @ViewChild('comparison') comparison!: ElementRef<HTMLElement>;
  @ViewChild('eligibilityTest') eligibilityTest!: ElementRef<HTMLElement>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private viewportScroller: ViewportScroller,
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

  ngAfterViewInit(): void {
    this.activatedRoute.fragment.pipe(
      first()
    ).subscribe((fragment) => {
      if (fragment !== null) {
        // had to use the timeout for correct positioning
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
        }, 100);
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  goToSignUp(): void {
      this.modalService.open(LandingRegisterModalComponent, {size: 'lg'});
  }

  onFAQLanguageChanged(language: Language) {
    this.languageService.setLanguage(language);
  }

  changeCourseType($event: Event) {
    this.currentCourse = COURSES[(($event.target as HTMLInputElement).checked.toString())]
  }

  goToEligibilityTest(): void {
    this.scrollTo(this.eligibilityTest.nativeElement);
  }

  goToComparison(): void {
    this.scrollTo(this.comparison.nativeElement);
  }

  scrollTo(element: HTMLElement): void {
    element.scrollIntoView({behavior: 'smooth'});
  }
}
