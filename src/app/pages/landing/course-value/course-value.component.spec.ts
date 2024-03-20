import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseValueComponent } from './course-value.component';

describe('CourseValueComponent', () => {
  let component: CourseValueComponent;
  let fixture: ComponentFixture<CourseValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseValueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
