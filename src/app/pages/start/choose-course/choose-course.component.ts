import {Component, ElementRef, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CourseOverviewService} from "../../../services/course-overview.service";
import {SelectableCourseOverview} from "../../../models/selectable-course-overview";
import {CourseBasic} from "../../../models/course";
import {CartService} from "../../../services/cart.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {BehaviorSubject, filter, finalize, Subject, switchMap, take, takeUntil, tap} from "rxjs";
import {Language} from "../../../models/language";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-choose-course',
  templateUrl: './choose-course.component.html',
  styleUrls: ['./choose-course.component.scss', '../../../shared/shared.scss', '../../../shared/course-card.scss']
})
export class ChooseCourseComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  @ViewChild('course') course!: ElementRef<HTMLElement>;

  courses: SelectableCourseOverview[] = [];
  selectedCourse: SelectableCourseOverview | null = null;

  selectedCourseLanguages: Language[] = [];
  language: Language | null = null;

  constructor(
    protected titleService: Title,
    protected router: Router,
    protected courseOverviewService: CourseOverviewService,
    protected cartService: CartService,
    protected languageService: LanguageService
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Choose course | Ontario Security License');

    this.courseOverviewService.getAll().subscribe((courses: CourseBasic[]) => {
      this.courses = courses.map((c) => {
        const selectable = c as SelectableCourseOverview;
        selectable.selected = false;
        return selectable;
      });

      this.onCourseSelected(this.courses[0]);
    });

    this.languageService.language$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(language => {
      if (this.selectedCourse !== null) {
        this.loadCourseDetails(this.selectedCourse);
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  scrollTo(element: HTMLElement): void {
    element.scrollIntoView({behavior: 'smooth'});
  }

  onCourseSelected(course: SelectableCourseOverview): void {
    this.courses.forEach(c => {
      c.selected = c.id === course.id;
    });

    this.loadCourseDetails(course);
    this.isLoading$.pipe(
      filter(v => !v),
      take(1)
    ).subscribe((v) => {
      this.scrollTo(this.course.nativeElement);
    })
  };

  loadCourseDetails(course: SelectableCourseOverview): void {
    this.isLoading$.next(true);
    this.courseOverviewService.getLanguages(course.id).pipe(
      tap((languages) => this.selectedCourseLanguages = languages),
      switchMap(() => this.courseOverviewService.get(course.id)),
      tap((course) => this.selectedCourse = course as SelectableCourseOverview),
      finalize(() => this.isLoading$.next(false))
    ).subscribe();
  }

  onLanguageChanged(language: Language): void {
    this.languageService.setLanguage(language);
  }

  onCourseAction(course: SelectableCourseOverview): void {
    this.cartService.addCourse(course as CourseBasic);
    this.router.navigate(['/start', 'pay']);
  }
}
