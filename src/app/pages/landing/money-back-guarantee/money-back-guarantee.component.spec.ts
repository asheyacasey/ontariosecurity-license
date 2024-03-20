import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyBackGuaranteeComponent } from './money-back-guarantee.component';

describe('MoneyBackGuaranteeComponent', () => {
  let component: MoneyBackGuaranteeComponent;
  let fixture: ComponentFixture<MoneyBackGuaranteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyBackGuaranteeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyBackGuaranteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
