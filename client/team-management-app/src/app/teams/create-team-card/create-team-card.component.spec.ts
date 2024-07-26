import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamCardComponent } from './create-team-card.component';

describe('CreateTeamCardComponent', () => {
  let component: CreateTeamCardComponent;
  let fixture: ComponentFixture<CreateTeamCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTeamCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTeamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
