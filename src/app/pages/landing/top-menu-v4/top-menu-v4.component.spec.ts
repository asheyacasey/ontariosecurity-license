import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMenuV4Component } from './top-menu-v4.component';

describe('TopMenuComponent', () => {
  let component: TopMenuV4Component;
  let fixture: ComponentFixture<TopMenuV4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopMenuV4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMenuV4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
