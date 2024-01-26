import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Language} from "../../../models/language";
import {LearnService} from "../../../services/learn.service";
import {filter, Subject, switchMap, takeUntil, tap} from "rxjs";
import {LearnLanguageService} from "../../../services/learn-language.service";

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  showMenu: boolean = false;

  currentLanguage: Language | null = null;
  languages: Language[] = [];

  @ViewChild('dropdown') dropdown!: ElementRef;

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.dropdown.nativeElement.contains(event.target)) {
      this.showMenu = false;
    }
  }

  constructor(
    private learnService: LearnService,
    private learnLanguageService: LearnLanguageService
  ) {
  }

  ngOnInit(): void {
    this.learnService.courseId$.pipe(
      takeUntil(this.destroy$),
      filter((courseId) => courseId !== null),
      tap((courseId) => {
        this.currentLanguage = this.learnLanguageService.getLanguage(courseId);
      }),
      switchMap((courseId) => this.learnService.getCourseLanguages(courseId))
    ).subscribe(languages => {
        this.languages = languages;
    })

    this.learnLanguageService.language$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(language => {
      this.currentLanguage = language;
    })
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  changeLanguage(language: Language) {
    this.learnLanguageService.setLanguage(this.learnService.courseId as number, language);
    this.showMenu = false;
  }
}
