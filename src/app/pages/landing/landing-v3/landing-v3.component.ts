import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {first, Observable, Subject, take, takeUntil} from "rxjs";
import {NgbModal, NgbOffcanvas, NgbOffcanvasRef} from "@ng-bootstrap/ng-bootstrap";
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
  selector: 'app-landing-v3',
  templateUrl: './landing-v3.component.html',
  styleUrls: ['./landing-v3.component.scss']
})
export class LandingV3Component implements OnInit, OnDestroy, AfterViewInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  currentCourse: Course = COURSES['false'];

  faqLanguages: Language[] = [];
  faqLanguage: Language | null = null;

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
}
