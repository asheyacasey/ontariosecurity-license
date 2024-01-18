import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, finalize, Observable, Subject, takeUntil} from "rxjs";
import {AdminDiscountCodeService} from "../../../../services/admin/admin-discount-code.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminDiscountCode, AdminDiscountCodeCreate} from "../../../../models/admin/discount-code";

@Component({
  selector: 'app-discount-code-edit',
  templateUrl: './discount-code-edit.component.html',
  styleUrls: ['./discount-code-edit.component.scss']
})
export class DiscountCodeEditComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  discountCode$: Observable<AdminDiscountCode> | null = null;

  discountCodeId: number | null = null;

  constructor(
    private discountCodeService: AdminDiscountCodeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      this.isLoading$.next(true);
      this.discountCodeId = Number(params['id']);

      this.discountCode$ = this.discountCodeService.getById(this.discountCodeId).pipe(
        finalize(() => this.isLoading$.next(false))
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(data: AdminDiscountCodeCreate) {
    if(this.discountCodeId === null) {
      return;
    }

    this.isLoading$.next(true);
    this.discountCodeService.update(this.discountCodeId, data).pipe(
      finalize(() => this.isLoading$.next(false))
    ).subscribe({
      next: () => {
        this.router.navigate(['/admin/discount-codes'])
      },
      error: () => {

      }
    });
  }
}
