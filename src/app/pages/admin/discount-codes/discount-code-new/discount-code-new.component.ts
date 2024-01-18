import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminDiscountCodeService} from "../../../../services/admin/admin-discount-code.service";
import {BehaviorSubject, finalize, Subject} from "rxjs";
import {AdminDiscountCodeCreate} from "../../../../models/admin/discount-code";
import {DiscountCodeFormComponent} from "../discount-code-form/discount-code-form.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-discount-code-new',
  templateUrl: './discount-code-new.component.html',
  styleUrls: ['./discount-code-new.component.scss']
})
export class DiscountCodeNewComponent implements OnInit {
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  @ViewChild('f') discountCodeForm!: DiscountCodeFormComponent

  constructor(
    private discountCodeService: AdminDiscountCodeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(discountCode: AdminDiscountCodeCreate): void {
    this.isLoading$.next(true);
    this.discountCodeService.create(discountCode).pipe(
      finalize(() => this.isLoading$.next(false))
    ).subscribe({
      next: () => {
        this.router.navigate(['/admin/discount-codes']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 409) {
          const control = this.discountCodeForm.discountCodeForm.get('name');
          if (control) {
            control.setErrors({
              serverError: 'This name is already used'
            })
          }
        }
      }
    })
  }
}
