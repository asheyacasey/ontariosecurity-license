import {Component, OnDestroy, OnInit} from "@angular/core";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged, finalize,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap
} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {SearchService} from "../../models/admin/search-service";
import {Pagination} from "../../models/admin/pagination";

@Component({template: ''})
export abstract class AbstractListingComponent<T extends Pagination> implements OnInit, OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  page: number = 1;
  pages: number | null = null;
  total: number | null = null;

  results: T | null = null;

  searchService!: SearchService<T>;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected viewport: ViewportScroller
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      const search = params['search'];
      if (search) {
        this.searchForm.patchValue({
          search: search
        })
      }
    });

    this.searchForm.controls['search'].valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(() => this.loadResults())
    ).subscribe((results) => {
      this.results = results;
    });

    this.loadResults().subscribe((results) => this.results = results);
  }

    ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  loadResults(): Observable<T> {
    this.isLoading$.next(true);
    return this.searchService.search(
      this.searchForm.controls['search'].value,
      this.page
    ).pipe(
      tap((result) => {
        this.page = result.page;
        this.pages = result.pages;
        this.total = result.total;
      }),
      finalize(() => {
        this.isLoading$.next(false);
        this.viewport.scrollToPosition([0, 0]);
      })
    );
  }

  onPageChange(page: number): void {
    if (!page) {
      return;
    }

    if (page !== this.page) {
      this.page = page;
      this.loadResults().subscribe((results) => this.results = results);
    }
  }


}
