import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCodesListComponent } from './discount-codes-list.component';

describe('DiscountCodesListComponent', () => {
  let component: DiscountCodesListComponent;
  let fixture: ComponentFixture<DiscountCodesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountCodesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountCodesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
