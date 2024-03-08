import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl, Form,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {BehaviorSubject, distinctUntilChanged, finalize, retry, Subject, takeUntil} from "rxjs";
import {FormalitiesStatus, ResumeUpload} from "../../../models/formality";
import {ResumeService} from "../../../services/resume.service";
import {FormalityService} from "../../../services/formality.service";

export interface DropdownOption {
  text: string;
}

export function isDropdownOption(object: unknown): object is DropdownOption {
  return Object.prototype.hasOwnProperty.call(object, 'text');
}

export function atLeastOneChecked(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return (control as FormArray).controls.some(c => c.value) ? null : {atLeastOneChecked: {value: false}};
  }
}

export function atLeastOneWeekdayChecked(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !Object.entries((control as FormGroup).controls).filter(([k, _]) => {
      return !k.endsWith('Availability')
    }).some(([k, v]) => {
      return v.value
    }) ? {atLeastOneWeekdayChecked: {value: false}} : null;
  }
}

export function atLeastOneLanguageChecked(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !Object.entries((control as FormGroup).controls).filter(([k, _]) => {
      return !k.endsWith('Proficiency')
    }).some(([k, v]) => {
      return v.value;
    }) ? {atLeastOneLanguageChecked: {value: false}} : null;
  }
}

export function atLeastOneCheckedIfSelected(path: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control.root;
    const c = form.get(path);
    if (!c) {
      return null;
    }

    return c.value && (!control.value || !control.value.length) ? {atLeastOneCheckedIfSelected: {value: false}} : null;
  }
}

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss', '../formalities.shared.scss']
})
export class ResumeComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  courseId: number | null = null;
  formalitiesStatus: FormalitiesStatus | null = null;

  MAX_LICENSE_SIZE: number = 2097152; // size in bytes

  file: File | null = null;

  dropdownSettings: { [key: string]: IDropdownSettings } = {
    workIn: {
      singleSelection: false,
      idField: 'text',
      textField: 'text',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false
    },
    weekdays: {
      singleSelection: false,
      idField: 'text',
      textField: 'text',
      allowSearchFilter: false,
      enableCheckAll: false
    }
  };

  dropdownData: { [key: string]: DropdownOption[] } = {
    workIn: [
      {text: 'Anywhere in GTA'},
      {text: 'Anywhere in Toronto'},
      {text: 'Hamilton'},
      {text: 'Brampton'},
      {text: 'Mississauga'},
      {text: 'Brantford'},
      {text: 'Burlington'},
      {text: 'Niagara Falls'},
      {text: 'St. Catharines'},
      {text: 'Barrie/Orillia'},
      {text: 'Durham Region (Pickering, Ajax, Oshawa, Whitby)'},
      {text: 'Kitchener/Waterloo/Guelph'},
      {text: 'London'},
      {text: 'Ottawa/Cornwall'},
      {text: 'Kingston'},
      {text: 'Bowmanville'},
      {text: 'York Region (Vaughan, Woodbridge, Richmond Hill)'},
      {text: 'Windsor/Chatham'},
    ],
    weekdays: [
      {text: 'Mornings'},
      {text: 'Evenings'},
      {text: 'Overnights'},
    ]
  }
  weekdays: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  securityTypes: string[] = [
    'Condo/Concierge',
    'Construction',
    'Hospital',
    'Nightclub Bouncing',
    'Plainclothes Loss Prevention',
    'Office building/Commercial',
    'Shopping Mall',
    'Airport',
    'Bodyguard',
    'Armed Guard',
    'Cash Escort',
    'Other, specify'
  ];

  personDescriptions: string[] = [
    'I am desperate and just need a job right now',
    'I am looking to make a career change and security seems interesting',
    'I just need a job in security until I can find something better',
    'Security is the career I want to continue in for the next 5-10 years',
    'I want to get into Military or Law Enforcement',
    'I am a student and need some side income',
    'I want to eventually start my own security business and would love to learn how things work in a company.'
  ];

  jobDescriptions: string[] = [
    'Something laid back, where I can sit and also have some time to read a book or study',
    'Somewhere where not a lot of people will see me and I can be flexible with patrols',
    'Somewhere high intensity where I am dealing with lots of people and being active',
    'Somewhere I can be on my feet and walking around the whole shift',
    'Somewhere I don\'t have to be outdoor or outside',
    'Outdoor or indoor, rained or shine, doesn\'t matter to me, I want to see some action'
  ];

  companyDescriptions: string[] = [
    'a small mom and pop company',
    'a mid size company',
    'a large corporate company with benefits where I will play a small role',
    'a small company where I can play a big role',
    'somewhere I can learn a lot, company size doesn\'t matter',
    'anywhere I can quickly get a job'
  ];

  actions: string[] = [
    'Making arrests',
    'Breaking up fights and getting physical',
    'Sitting at a desk all day',
    'Being on your feet and waling around for 8 hours',
    'Working by yourself',
    'Dressing up in suit every day',
    'Using your personal car for work and/or patrols'
  ];

  languages: string[] = [
    'English',
    'French',
    'Mandarin',
    'Cantonese',
    'Punjabi'
  ]

  getFormSecurityTypes(): Array<FormControl> {
    return this.securityTypes.map(() => {
      return new FormControl(false, []);
    })
  }

  getFormActions(): Array<FormControl> {
    return this.actions.map(() => {
      return new FormControl(false, []);
    })
  }

  getFormPersonDescriptions(): Array<FormControl> {
    return this.personDescriptions.map(() => {
      return new FormControl(false, []);
    })
  }

  getFormJobDescriptions(): Array<FormControl> {
    return this.jobDescriptions.map(() => {
      return new FormControl(false, []);
    })
  }

  getFormCompanyDescriptions(): Array<FormControl> {
    return this.companyDescriptions.map(() => {
      return new FormControl(false, []);
    })
  }

  resumeForm = new FormGroup({
    licenseFile: new FormControl(null, [Validators.required]),
    startWhen: new FormControl('', [Validators.required]),
    ownsCar: new FormControl('', [Validators.required]),
    transportMethod: new FormControl(null, []),
    where: new FormControl([], [Validators.required, Validators.minLength(1)]),
    howManyHours: new FormControl('', [Validators.required]),
    weekdays: new FormGroup({
      Monday: new FormControl(false, []),
      Tuesday: new FormControl(false, []),
      Wednesday: new FormControl(false, []),
      Thursday: new FormControl(false, []),
      Friday: new FormControl(false, []),
      Saturday: new FormControl(false, []),
      Sunday: new FormControl(false, []),
      MondayAvailability: new FormControl([], [atLeastOneCheckedIfSelected(['weekdays', 'Monday'])]),
      TuesdayAvailability: new FormControl([], [atLeastOneCheckedIfSelected(['weekdays', 'Tuesday'])]),
      WednesdayAvailability: new FormControl([], [atLeastOneCheckedIfSelected(['weekdays', 'Wednesday'])]),
      ThursdayAvailability: new FormControl([], [atLeastOneCheckedIfSelected(['weekdays', 'Thursday'])]),
      FridayAvailability: new FormControl([], [atLeastOneCheckedIfSelected(['weekdays', 'Friday'])]),
      SaturdayAvailability: new FormControl([], [atLeastOneCheckedIfSelected(['weekdays', 'Saturday'])]),
      SundayAvailability: new FormControl([], [atLeastOneCheckedIfSelected(['weekdays', 'Sunday'])]),
    }, [atLeastOneWeekdayChecked()]),
    securityType: new FormArray(this.getFormSecurityTypes(), [atLeastOneChecked()]),
    securityTypeOther: new FormControl('', []),
    hourlyRate: new FormControl('', [Validators.required]),
    hourlyRateNegotiate: new FormControl('', [Validators.required]),
    languages: new FormGroup({
      English: new FormControl(false, []),
      French: new FormControl(false, []),
      Mandarin: new FormControl(false, []),
      Cantonese: new FormControl(false, []),
      Punjabi: new FormControl(false, []),
      EnglishProficiency: new FormControl([], [atLeastOneCheckedIfSelected(['languages', 'English'])]),
      FrenchProficiency: new FormControl([], [atLeastOneCheckedIfSelected(['languages', 'French'])]),
      MandarinProficiency: new FormControl([], [atLeastOneCheckedIfSelected(['languages', 'Mandarin'])]),
      CantoneseProficiency: new FormControl([], [atLeastOneCheckedIfSelected(['languages', 'Cantonese'])]),
      PunjabiProficiency: new FormControl([], [atLeastOneCheckedIfSelected(['languages', 'Punjabi'])]),
    }, [atLeastOneLanguageChecked()]),
    actions: new FormArray(this.getFormActions(), [atLeastOneChecked()]),
    personDescriptions: new FormArray(this.getFormPersonDescriptions(), [atLeastOneChecked()]),
    jobDescriptions: new FormArray(this.getFormJobDescriptions(), [atLeastOneChecked()]),
    companyDescriptions: new FormArray(this.getFormCompanyDescriptions(), [atLeastOneChecked()]),
    whyYou: new FormControl('', [Validators.required]),
  });


  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    if (event) {
      this.file = event && event.item(0);
    }
  }

  getAllErrors(form: FormGroup | FormArray): { [key: string]: any; } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
      const control = form.get(key);
      const errors = (control instanceof FormGroup || control instanceof FormArray)
        ? this.getAllErrors(control)
        : control?.errors;
      if (errors) {
        acc[key] = errors;
        hasError = true;
      }
      return acc;
    }, {} as { [key: string]: any; });
    return hasError ? result : null;
  }

  constructor(
    private formalityService: FormalityService,
    private resumeService: ResumeService
  ) {
  }

  ngOnInit(): void {
    this.formalityService.courseId$.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()
    ).subscribe(courseId => {
      this.courseId = courseId;
    })

    this.formalityService.formalitiesStatus$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(status => {
      this.formalitiesStatus = status;
    })


    this.resumeForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()
    ).subscribe((v) => {
      this.convertDropdownToString(
        this.resumeForm,
        (k) => k === 'where',
        v
      );
    });


    this.resumeForm.get('weekdays')?.valueChanges.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()
    ).subscribe((v) => {
      this.convertDropdownToString(
        this.resumeForm.get('weekdays'),
        (k) => k.endsWith('Availability'),
        v
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  formToData(): ResumeUpload {
    const raw = this.resumeForm.getRawValue();

    return {
      licenseFile: this.file as File,
      startWhen: raw.startWhen as string,
      ownsCar: raw.ownsCar as string,
      transportMethod: raw.transportMethod,
      where: raw.where as string[],
      howManyHours: raw.howManyHours as string,
      weekdays: Object.entries(raw.weekdays).filter(([k, v]) => {
        return typeof v === 'boolean' && v;
      }).map(([k, v]) => {
        return {
          day: k,
          // @ts-ignore
          time: raw.weekdays[`${k}Availability`]
        }
      }),
      securityType: Object.entries(raw.securityType).flatMap(([k, v], i) => {
        if (!v) {
          return [];
        }
        return i < this.securityTypes.length - 1 ? this.securityTypes[i] : raw.securityTypeOther as string;
      }),
      hourlyRate: raw.hourlyRate as string,
      hourlyRateNegotiate: raw.hourlyRateNegotiate as string,
      languages: Object.entries(raw.languages).filter(([k, v]) => {
        return typeof v === 'boolean' && v;
      }).map(([k, v]) => {
        return {
          language: k,
          // @ts-ignore
          proficiency: raw.languages[`${k}Proficiency`]
        }
      }),
      actions: Object.entries(raw.actions).flatMap(([k, v], i) => {
        return v ? this.actions[i] : [];
      }),
      personDescriptions: Object.entries(raw.personDescriptions).flatMap(([k, v], i) => {
        return v ? this.personDescriptions[i] : [];
      }),
      jobDescriptions: Object.entries(raw.jobDescriptions).flatMap(([k, v], i) => {
        return v ? this.jobDescriptions[i] : [];
      }),
      companyDescriptions: Object.entries(raw.companyDescriptions).flatMap(([k, v], i) => {
        return v ? this.companyDescriptions[i] : [];
      }),
      whyYou: raw.whyYou as string
    };
  }

  onSubmit(): void {
    if (!this.courseId) {
      return;
    }

    this.isLoading$.next(true);

    const data = this.formToData();
    this.resumeService.submit(this.courseId, data).pipe(
      finalize(() => this.isLoading$.next(false))
    ).subscribe({
      next: () => {
        this.formalityService.getStatus(this.courseId as number).subscribe();
      },
      error: (error) => {
        if (error.status === 413) {
          const control = this.resumeForm.get('licenseFile');
          if (control) {
            control.setErrors({
              serverError: 'Max file size is 5MB'
            })
          }
        }
      }
    })
  }

  onSelectFile($event: Event) {
    const target = $event.target as HTMLInputElement;
    const file = target.files && target.files[0];
    if (file && file.size > this.MAX_LICENSE_SIZE) {
      const control = this.resumeForm.get('licenseFile');
      if (control) {
        control.setErrors({
          serverError: 'File size cannot exceed 2MB'
        })
      }
    }
  }

  weekdaySelected(day: string): boolean {
    return this.resumeForm.get(['weekdays', day])?.value as boolean;
  }

  languageSelected(language: string): boolean {
    return this.resumeForm.get(['languages', language])?.value as boolean;
  }

  showSecurityTypeOtherField(name: string): boolean {
     return (this.resumeForm.get('securityType') as FormArray).at(11).value as boolean;
  }

  convertDropdownToString(sourceForm: AbstractControl | null, matchFn: (k: string) => boolean, v: { [key: string]: any } | never | null): void {
    if (sourceForm === null) {
      return;
    }

    if (!v) {
      return;
    }

    const toUpdate: { [key: string]: string[] } = {};

    for (const [key, value] of Object.entries<(string | DropdownOption)[] | boolean | null>(v)) {
      if (value === null || typeof value === 'boolean') {
        continue
      }

      if (!matchFn(key)) {
        continue
      }

      let altered: boolean = false;
      const values: string[] = [];
      value.forEach((v) => {
        if (isDropdownOption(v)) {
          values.push(v.text);
          altered = true;
        } else {
          values.push(v);
        }
      });

      if (altered) {
        toUpdate[key] = values;
      }
    }

    if (Object.keys(toUpdate).length) {
      // @ts-ignore
      sourceForm.patchValue(toUpdate);
    }

  }
}
