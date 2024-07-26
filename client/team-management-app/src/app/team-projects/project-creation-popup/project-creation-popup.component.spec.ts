import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCreationPopupComponent } from './project-creation-popup.component';

describe('ProjectCreationPopupComponent', () => {
  let component: ProjectCreationPopupComponent;
  let fixture: ComponentFixture<ProjectCreationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectCreationPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCreationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
