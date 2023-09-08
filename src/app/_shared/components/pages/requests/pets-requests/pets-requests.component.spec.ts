import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsRequestsComponent } from './pets-requests.component';

describe('PetsRequestsComponent', () => {
  let component: PetsRequestsComponent;
  let fixture: ComponentFixture<PetsRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetsRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
