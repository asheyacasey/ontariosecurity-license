import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {TimeConverterService} from "../../../services/admin/time-converter.service";
import {BehaviorSubject, distinctUntilChanged, finalize, Subject, takeUntil} from "rxjs";
import {CPRDocumentUpload, FormalitiesStatus} from "../../../models/formality";
import {FormalityService} from "../../../services/formality.service";
import {DefaultNgbDateAdapter} from "../../../formatters/ngb-date-adapter";
import {DefaultDateParserFormatter} from "../../../formatters/ngb-date-parser-formatter";


export function validCPRProviderValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const other = control.value;
    return other === 'OTHER' ? {invalidCPRProvider: {value: control.value}} : null;
  }
}

@Component({
  selector: 'app-cpr',
  templateUrl: './cpr.component.html',
  styleUrls: ['./cpr.component.scss', '../formalities.shared.scss', '../../../shared/shared.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: DefaultNgbDateAdapter},
    {provide: NgbDateParserFormatter, useClass: DefaultDateParserFormatter},
  ],
})
export class CprComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  cprForm = new FormGroup({
    file: new FormControl(null, Validators.required),
    expiresAt: new FormControl('', Validators.required),
    cprProvider: new FormControl('', [Validators.required, validCPRProviderValidator()])
  })

  courseId: number | null = null;
  formalitiesStatus: FormalitiesStatus | null = null;

  today: NgbDateStruct;
  file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    if (event) {
      this.file = event && event.item(0);
    }
  }

  constructor(
    private formalityService: FormalityService,
    private timeConverterService: TimeConverterService,
  ) {
    this.today = this.timeConverterService.stringToNgbDateStruct(
      new Date().toISOString().substring(0, 10)
    ) as NgbDateStruct;
  }

  ngOnInit(): void {
    this.formalityService.courseId$.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()
    ).subscribe(courseId => {
      this.courseId = courseId;

      this.cprForm.reset();
      this.file = null;
    });

    this.formalityService.formalitiesStatus$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(status => {
      this.formalitiesStatus = status;
    })

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    if (!this.courseId) {
      return;
    }

    this.isLoading$.next(true);

    const raw = this.cprForm.getRawValue();
    const data: CPRDocumentUpload = {
      file: this.file as File,
      expiresAt: raw.expiresAt as string,
      cprProvider: raw.cprProvider as string
    };

    this.formalityService.uploadCPR(this.courseId, data).pipe(
      finalize(() => this.isLoading$.next(false))
    ).subscribe({
      next: () => {
        this.formalityService.getStatus(this.courseId as number).subscribe();
      },
      error: (error) => {
        if (error.status === 413) {
          const control = this.cprForm.get('file');
          if (control) {
            control.setErrors({
              serverError: 'Max file size is 5MB'
            })
          }
        }
      }
    })


  }
}
