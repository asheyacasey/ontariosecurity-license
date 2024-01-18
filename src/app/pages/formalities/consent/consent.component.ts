import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, finalize, Subject, takeUntil} from "rxjs";
import {AdminFormalityService} from "../../../services/admin/admin-formality.service";
import {FormalityService} from "../../../services/formality.service";
import {ConsentUpload, FormalitiesStatus} from "../../../models/formality";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {DefaultNgbDateAdapter} from "../../../formatters/ngb-date-adapter";
import {DefaultDateParserFormatter} from "../../../formatters/ngb-date-parser-formatter";
import {NgxSignatureOptions, NgxSignaturePadComponent} from "@eve-sama/ngx-signature-pad";
import {ConsentFormService} from "../../../services/consent-form.service";

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss', '../formalities.shared.scss', '../../../shared/shared.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: DefaultNgbDateAdapter},
    {provide: NgbDateParserFormatter, useClass: DefaultDateParserFormatter},
  ],
})
export class ConsentComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  courseId: number | null = null;
  formalitiesStatus: FormalitiesStatus | null = null;

  consentForm = this.formInit();
  mailingAddress = this.formGroupAddressInit();

  minDate: NgbDateStruct = {
    year: 1920,
    month: 1,
    day: 1
  };

  signatureOptions: NgxSignatureOptions = {
    width: 380,
    height: 100,
    css: {
      border: '1px solid #ACADBF'
    }
  };

  @ViewChild('signature') signature!: NgxSignaturePadComponent;


  constructor(
    private formalityService: FormalityService,
    private consentFormService: ConsentFormService
  ) {
  }

  ngOnInit(): void {
    this.formalityService.courseId$.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()
    ).subscribe(courseId => {
      this.courseId = courseId;
      this.formReset();

      if (this.courseId !== null) {
        this.consentFormService.getPrefill(this.courseId).subscribe(values => {
          this.consentForm.patchValue(values);
          this.consentForm.get('address')?.patchValue(values);
        });
      }
    });

    this.formalityService.formalitiesStatus$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(status => {
      this.formalitiesStatus = status;
    });

    this.consentForm.get('differentMailingAddress')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      if (value === false) {
        this.removeMailingAddress();
      } else {
        this.addMailingAddress();
      }
    });
  }

  formGroupAddressInit(): FormGroup {
    return new FormGroup({
      unitNo: new FormControl(''),
      streetNo: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]),
      streetName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]),
      poBox: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]),
      city: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(32)]),
      province: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(32)]),
      postalCode: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(16)])
    });
  }

  formInit(): FormGroup {
    return new FormGroup({
      lastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]),
      middleNames: new FormControl('', [Validators.maxLength(128)]),
      otherNames: new FormControl('', [Validators.maxLength(128)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      address: this.formGroupAddressInit(),
      differentMailingAddress: new FormControl(false),
    });
  }

  formReset(): void {
    this.consentForm.reset();
    this.consentForm = this.formInit();
    if (this.signature) {
      this.signature.clear();
    }
  }

  addMailingAddress(): void {
    // @ts-ignore
    this.consentForm.addControl('mailingAddress', this.mailingAddress);
    this.consentForm.updateValueAndValidity();
  }

  removeMailingAddress(): void {
    // @ts-ignore
    this.consentForm.removeControl('mailingAddress');
    this.consentForm.updateValueAndValidity();
  }

  clearSignature(): void {
    this.signature.clear();
  }

  onSubmit(): void {
    if (this.courseId === null) {
      return;
    }

    this.consentForm.markAllAsTouched();

    this.isLoading$.next(true);

    // @ts-ignore
    const signature = this.signature.toDataURL("image/png");
    const data = this.consentForm.value as ConsentUpload;
    data.signature = signature;

    this.consentFormService.save(this.courseId, data)
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe({
        next: () => {
          this.formalityService.getStatus(this.courseId as number).subscribe();
        }
      });

  }
}
