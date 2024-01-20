import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Language} from "../../models/language";
import {LearnService} from "../../services/learn.service";
import {filter, Subject, switchMap, takeUntil, tap} from "rxjs";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  showMenu: boolean = false;

  @Input() languages: Language[] = [];
  @Input() currentLanguage: Language | null = null;

  @Output() languageChanged = new EventEmitter<Language>();

  @ViewChild('dropdown') dropdown!: ElementRef;

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.dropdown.nativeElement.contains(event.target)) {
      this.showMenu = false;
    }
  }

  constructor() {
  }

  ngOnInit(): void {

  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  onLanguageChanged(language: Language): void {
    if (language !== this.currentLanguage) {
      this.languageChanged.emit(language);
    }

    this.showMenu = false;
  }
}
