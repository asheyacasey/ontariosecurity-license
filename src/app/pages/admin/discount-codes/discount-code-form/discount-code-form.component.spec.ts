import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCodeFormComponent } from './discount-code-form.component';

describe('DiscountCodeFormComponent', () => {
  let component: DiscountCodeFormComponent;
  let fixture: ComponentFixture<DiscountCodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountCodeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountCodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
