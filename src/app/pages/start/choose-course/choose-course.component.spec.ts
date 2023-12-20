import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCourseComponent } from './choose-course.component';

describe('ChooseCourseComponent', () => {
  let component: ChooseCourseComponent;
  let fixture: ComponentFixture<ChooseCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
