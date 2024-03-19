import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizQuestionCheckComponent } from './quiz-question-check.component';

describe('QuizQuestionCheckComponent', () => {
  let component: QuizQuestionCheckComponent;
  let fixture: ComponentFixture<QuizQuestionCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizQuestionCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizQuestionCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
