import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCompanyComponent } from './select-company.component';

describe('SelectCompanyComponent', () => {
  let component: SelectCompanyComponent;
  let fixture: ComponentFixture<SelectCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
