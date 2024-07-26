import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamProjectsComponent } from './team-projects.component';

describe('TeamProjectsComponent', () => {
  let component: TeamProjectsComponent;
  let fixture: ComponentFixture<TeamProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
