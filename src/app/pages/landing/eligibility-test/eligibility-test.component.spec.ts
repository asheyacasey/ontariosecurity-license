import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityTestComponent } from './eligibility-test.component';

describe('SecurityKnowledgeTestComponent', () => {
  let component: EligibilityTestComponent;
  let fixture: ComponentFixture<EligibilityTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EligibilityTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EligibilityTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
