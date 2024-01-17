import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcnComponent } from './tcn.component';

describe('TcnComponent', () => {
  let component: TcnComponent;
  let fixture: ComponentFixture<TcnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TcnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
