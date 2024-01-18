import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCodeEditComponent } from './discount-code-edit.component';

describe('DiscountCodeEditComponent', () => {
  let component: DiscountCodeEditComponent;
  let fixture: ComponentFixture<DiscountCodeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountCodeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountCodeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
