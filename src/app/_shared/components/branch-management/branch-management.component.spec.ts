import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesAddComponent } from './branch-management.component';

describe('BranchesAddComponent', () => {
  let component: BranchesAddComponent;
  let fixture: ComponentFixture<BranchesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchesAddComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BranchesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
