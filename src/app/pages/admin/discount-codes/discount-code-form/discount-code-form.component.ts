import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {AdminDiscountCode, AdminDiscountCodeCreate} from "../../../../models/admin/discount-code";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {TimeConverterService} from "../../../../services/admin/time-converter.service";

@Component({
  selector: 'app-discount-code-form',
  templateUrl: './discount-code-form.component.html',
  styleUrls: ['./discount-code-form.component.scss', '../../../../shared/shared.scss']
})
export class DiscountCodeFormComponent implements OnInit, OnChanges {
  @Input() isEdit: boolean = false;
  @Input() discountCode: AdminDiscountCode | null = null;
  @Input() isLoading$!: Subject<boolean>;

  @Output() submitted = new EventEmitter<AdminDiscountCodeCreate>();

  discountCodeForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, Validators.minLength(2), Validators.maxLength(32)
    ]),
    validFrom: new FormControl(null),
    validUntil: new FormControl(null),
    discountPercent: new FormControl(10, [
      Validators.required, Validators.min(1), Validators.max(99)
    ]),
    enabled: new FormControl(true)
  })

  constructor(private timeConverterService: TimeConverterService) {
  }

  ngOnInit(): void {
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['discountCode']) {
      const raw = changes['discountCode'].currentValue;
      raw.validFrom = this.timeConverterService.stringToNgbDateStruct(raw.validFrom);
      raw.validUntil = this.timeConverterService.stringToNgbDateStruct(raw.validUntil);

      this.discountCodeForm.patchValue(raw);
    }
  }

  onSubmit(): void {
    const raw = this.discountCodeForm.getRawValue();
    const data = raw as AdminDiscountCodeCreate;

    data.validFrom = this.timeConverterService.ngbDateStructToString(raw.validFrom);
    data.validUntil = this.timeConverterService.ngbDateStructToString(raw.validUntil);

    this.submitted.next(data);
  }


}
