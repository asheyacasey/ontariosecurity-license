import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTimerComponent } from './course-timer.component';

describe('TimerComponent', () => {
  let component: CourseTimerComponent;
  let fixture: ComponentFixture<CourseTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseTimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
