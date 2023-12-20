import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProgressBarComponent } from './course-progress-bar.component';

describe('ProgressBarComponent', () => {
  let component: CourseProgressBarComponent;
  let fixture: ComponentFixture<CourseProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseProgressBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
