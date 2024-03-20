import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneOnOneComponent } from './one-on-one.component';

describe('OneOnOneComponent', () => {
  let component: OneOnOneComponent;
  let fixture: ComponentFixture<OneOnOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneOnOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneOnOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
