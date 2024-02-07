import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityKnowledgeTestComponent } from './security-knowledge-test.component';

describe('SecurityKnowledgeTestComponent', () => {
  let component: SecurityKnowledgeTestComponent;
  let fixture: ComponentFixture<SecurityKnowledgeTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityKnowledgeTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityKnowledgeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
