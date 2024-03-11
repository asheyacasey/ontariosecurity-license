import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TellUsAboutYouComponent } from './tell-us-about-you.component';

describe('TellUsAboutYouComponent', () => {
  let component: TellUsAboutYouComponent;
  let fixture: ComponentFixture<TellUsAboutYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TellUsAboutYouComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TellUsAboutYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
