import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCodeNewComponent } from './discount-code-new.component';

describe('DiscountCodeNewComponent', () => {
  let component: DiscountCodeNewComponent;
  let fixture: ComponentFixture<DiscountCodeNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountCodeNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountCodeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
