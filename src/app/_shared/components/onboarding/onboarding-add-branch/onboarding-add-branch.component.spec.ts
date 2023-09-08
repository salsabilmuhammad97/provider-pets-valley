import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingAddBranchComponent } from './onboarding-add-branch.component';

describe('OnboardingAddBranchComponent', () => {
  let component: OnboardingAddBranchComponent;
  let fixture: ComponentFixture<OnboardingAddBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingAddBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingAddBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
