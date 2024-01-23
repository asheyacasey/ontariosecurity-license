import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewBulkComponent } from './user-new-bulk.component';

describe('UserNewBulkComponent', () => {
  let component: UserNewBulkComponent;
  let fixture: ComponentFixture<UserNewBulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNewBulkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNewBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
