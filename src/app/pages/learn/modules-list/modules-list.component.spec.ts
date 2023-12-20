import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesListComponent } from './modules-list.component';

describe('ModulesListComponent', () => {
  let component: ModulesListComponent;
  let fixture: ComponentFixture<ModulesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
