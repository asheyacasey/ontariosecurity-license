import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsListComponent } from './sections-list.component';

describe('SectionsListComponent', () => {
  let component: SectionsListComponent;
  let fixture: ComponentFixture<SectionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
