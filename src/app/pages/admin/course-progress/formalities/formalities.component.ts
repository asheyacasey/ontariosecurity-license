import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AdminUser} from "../../../../models/admin/user";
import {AdminCourse} from "../../../../models/admin/course";
import {BehaviorSubject, finalize, Subject, takeUntil} from "rxjs";
import {AdminFormalityService} from "../../../../services/admin/admin-formality.service";
import {AdminFormalitiesStatus} from "../../../../models/admin/formality";
import {blobDownload} from "../../../../utils/blob-download";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-formalities[user][course]',
  templateUrl: './formalities.component.html',
  styleUrls: ['./formalities.component.scss']
})
export class FormalitiesComponent implements OnInit, OnDestroy {
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(true);
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() user!: AdminUser
  @Input() course!: AdminCourse

  status: AdminFormalitiesStatus | null = null;

  tcnForm = new FormGroup({
    tcn: new FormControl('', [Validators.required])
  });

  constructor(private adminFormalityService: AdminFormalityService) {
  }

  ngOnInit(): void {
    this.reloadStatus();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  reloadStatus(): void {
    this.adminFormalityService.getStatus(this.user, this.course).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading$.next(false))
    ).subscribe(status => {
      this.status = status;
      if (this.status.tcn?.tcn) {
        this.tcnForm.patchValue({
          tcn: this.status.tcn.tcn
        })
      }
    })
  }

  onCPRDownload(userCourseCPRDocumentId: number | undefined): void {
    if (userCourseCPRDocumentId === undefined) {
      return;
    }

    this.adminFormalityService.downloadCPRDocument(userCourseCPRDocumentId).subscribe(response => {
      blobDownload(response, 'cpr');
    })
  }

  onConsentDownload(userCourseConsentDataId: number | undefined): void {
    if (userCourseConsentDataId === undefined) {
      return;
    }

    this.adminFormalityService.downloadConsentFormPDF(userCourseConsentDataId).subscribe(response => {
      blobDownload(response, 'consent');
    })
  }

  updateTCN(): void {
    const tcn = this.tcnForm.get('tcn')?.value;
    if (!tcn) {
      return;
    }

    this.isLoading$.next(true);
    this.adminFormalityService.updateTCN(this.user, this.course, tcn).pipe(
      finalize(() => this.reloadStatus())
    ).subscribe();
  }
}
