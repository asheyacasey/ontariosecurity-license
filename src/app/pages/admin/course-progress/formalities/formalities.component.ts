import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AdminUser} from "../../../../models/admin/user";
import {AdminCourse} from "../../../../models/admin/course";
import {BehaviorSubject, finalize, Subject, takeUntil} from "rxjs";
import {AdminFormalityService} from "../../../../services/admin/admin-formality.service";
import {AdminFormalitiesStatus} from "../../../../models/admin/formality";
import {blobDownload} from "../../../../utils/blob-download";

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

  constructor(private adminFormalityService: AdminFormalityService) {
  }

  ngOnInit(): void {
    this.adminFormalityService.getStatus(this.user, this.course).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading$.next(false))
    ).subscribe(status => {
      this.status = status;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onCPRDownload(userCourseCPRDocumentId: number | undefined): void {
    if (userCourseCPRDocumentId === undefined) {
      return;
    }

    this.adminFormalityService.downloadCPRDocument(userCourseCPRDocumentId).subscribe(response => {
      blobDownload(response, 'cpr');
    })
  }

}
