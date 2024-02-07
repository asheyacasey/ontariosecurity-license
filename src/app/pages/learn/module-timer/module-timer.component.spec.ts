import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTimerComponent } from './module-timer.component';

describe('ModuleTimerComponent', () => {
  let component: ModuleTimerComponent;
  let fixture: ComponentFixture<ModuleTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleTimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
