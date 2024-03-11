import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringPartnersComponent } from './hiring-partners.component';

describe('HiringPartnersComponent', () => {
  let component: HiringPartnersComponent;
  let fixture: ComponentFixture<HiringPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringPartnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiringPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
