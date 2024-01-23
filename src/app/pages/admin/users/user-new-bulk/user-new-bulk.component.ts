import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AdminCourseService} from "../../../../services/admin/admin-course.service";
import {AdminCourse} from "../../../../models/admin/course";
import {BehaviorSubject, finalize, Subject} from "rxjs";
import {AdminUserService} from "../../../../services/admin/admin-user.service";
import {AdminUserBulkCreate} from "../../../../models/admin/user";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-new-bulk',
  templateUrl: './user-new-bulk.component.html',
  styleUrls: ['./user-new-bulk.component.scss', '../../../../shared/shared.scss']
})
export class UserNewBulkComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  bulkUserCreateForm = new FormGroup({
    emails: new FormControl('', [Validators.required]),
    courseId: new FormControl(null, [Validators.required])
  })

  availableCourses: AdminCourse[] = [];

  constructor(
    private router: Router,
    private adminCourseService: AdminCourseService,
    private adminUserService: AdminUserService
  ) {
  }

  ngOnInit(): void {
    this.adminCourseService.search('', 1).subscribe(courses => {
      this.availableCourses = courses.items;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    const emails = this.bulkUserCreateForm.get('emails')?.value?.split('\n').map(e => e.trim()).filter(e => e.length);
    if (!emails) {
      return;
    }

    const courseId = this.bulkUserCreateForm.get('courseId')?.value;
    if (!courseId) {
      return;
    }

    const data: AdminUserBulkCreate = {
      emails: emails,
      courseId: courseId
    }

    this.isLoading$.next(true);
    this.adminUserService.bulkCreate(data).pipe(
      finalize(() => this.isLoading$.next(false))
    ).subscribe({
      next: () => {
        this.router.navigate(['/admin/users'])
      },
      error: (error: HttpErrorResponse) => {
        const control = this.bulkUserCreateForm.get('emails');
        if (!control) {
          return;
        }

        if (error.status === 422) {
          control.setErrors({
            serverError: 'Invalid emails present'
          })
        }

        if (error.status === 409) {
          control.setErrors({
            serverError: `The following emails are already registered: ${error.error.detail.join(', ')}`
          })
        }
      }
    });
  }
}
