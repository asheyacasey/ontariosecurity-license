import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subject, take, takeUntil} from "rxjs";
import {NgbOffcanvas, NgbOffcanvasRef} from "@ng-bootstrap/ng-bootstrap";
import {Language} from "../../../models/language";
import {LanguageService} from "../../../services/language.service";
import {FaqService} from "../../../services/faq.service";

@Component({
  selector: 'app-landing-v3',
  templateUrl: './landing-v3.component.html',
  styleUrls: ['./landing-v3.component.scss']
})
export class LandingV3Component implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('offcanvas') offcanvas!: TemplateRef<any>;

  @ViewChild('faq') faq!: ElementRef<HTMLElement>;
  @ViewChild('signUp') signUp!: ElementRef<HTMLElement>;

  offcanvasRef: NgbOffcanvasRef | null = null;

  faqLanguages: Language[] = [];
  faqLanguage: Language | null = null;

  constructor(
    private router: Router,
    private offcanvasService: NgbOffcanvas,
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

  goToCourses() {
    this.closeOffcanvasCallback(() => {
      this.router.navigate(['/courses'])
    });
  }

  goToLogin(): void {
    this.closeOffcanvasCallback(() => {
      this.router.navigate(['/login']);
    });
  }

  goToFAQ(): void {
    this.closeOffcanvasCallback(() => {
      this.scrollTo(this.faq.nativeElement);
    });
  }

  goToSignUp(): void {
    this.closeOffcanvasCallback(() => {
      this.scrollTo(this.signUp.nativeElement);
    });
  }

  scrollTo(element: HTMLElement): void {
    element.scrollIntoView({behavior: 'smooth'});
  }

  onFAQLanguageChanged(language: Language) {
    this.languageService.setLanguage(language);
  }
}
