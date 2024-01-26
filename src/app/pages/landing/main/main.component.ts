import {Component, OnDestroy, OnInit} from '@angular/core';
import {FaqService} from "../../../services/faq.service";
import {Language} from "../../../models/language";
import {LanguageService} from "../../../services/language.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  faqLanguages: Language[] = [];
  faqLanguage: Language | null = null;

  constructor(
    private languageService: LanguageService,
    private faqService: FaqService
  ) { }

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

  onFAQLanguageChanged(language: Language) {
    this.languageService.setLanguage(language);
  }
}
