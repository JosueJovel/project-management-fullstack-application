import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCreationPopupComponent } from './team-creation-popup.component';

describe('TeamCreationPopupComponent', () => {
  let component: TeamCreationPopupComponent;
  let fixture: ComponentFixture<TeamCreationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamCreationPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamCreationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
