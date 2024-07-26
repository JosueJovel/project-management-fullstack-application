import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserOverlayComponent } from './add-user-overlay.component';

describe('AddUserOverlayComponent', () => {
  let component: AddUserOverlayComponent;
  let fixture: ComponentFixture<AddUserOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
