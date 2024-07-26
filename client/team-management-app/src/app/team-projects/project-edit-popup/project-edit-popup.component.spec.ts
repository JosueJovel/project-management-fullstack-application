import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditPopupComponent } from './project-edit-popup.component';

describe('ProjectEditPopupComponent', () => {
  let component: ProjectEditPopupComponent;
  let fixture: ComponentFixture<ProjectEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectEditPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
