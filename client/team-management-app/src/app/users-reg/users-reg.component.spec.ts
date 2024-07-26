import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRegComponent } from './users-reg.component';

describe('UsersRegComponent', () => {
  let component: UsersRegComponent;
  let fixture: ComponentFixture<UsersRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersRegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
