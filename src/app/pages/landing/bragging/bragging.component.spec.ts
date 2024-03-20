import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BraggingComponent } from './bragging.component';

describe('BraggingComponent', () => {
  let component: BraggingComponent;
  let fixture: ComponentFixture<BraggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BraggingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BraggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
