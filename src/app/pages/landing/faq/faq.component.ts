import {Component, OnDestroy, OnInit} from '@angular/core';
import {FAQItem} from "../../../models/faq";
import {LanguageService} from "../../../services/language.service";
import {Subject, takeUntil} from "rxjs";
import {FaqService} from "../../../services/faq.service";
import {Language} from "../../../models/language";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  questions: FAQItem[] = [];
  language: Language = this.languageService.getLanguage();

  constructor(
    private languageService: LanguageService,
    private faqService: FaqService
  ) {
  }


  ngOnInit(): void {
    this.languageService.language$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(language => {
      if (language !== null) {
        this.language = language;
        this.questions = this.faqService.getItems(language);
      }
    });

    this.questions = this.faqService.getItems(this.language);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  toggleItem(question: FAQItem): void {
    this.questions.forEach(q => {
      q.open = q === question ? !q.open : false;
    });
  }
}
