import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesListingComponent } from './modules-listing.component';

describe('ModulesListingComponent', () => {
  let component: ModulesListingComponent;
  let fixture: ComponentFixture<ModulesListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulesListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
