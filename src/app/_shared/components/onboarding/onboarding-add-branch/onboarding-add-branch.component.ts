import { Component, OnInit } from '@angular/core';
import { Coordinates } from 'src/app/_shared/interfaces/coordinates';
import { AuthService } from 'src/app/_shared/service/auth.service';

@Component({
  selector: 'app-onboarding-add-branch',
  templateUrl: './onboarding-add-branch.component.html',
  styleUrls: ['./onboarding-add-branch.component.scss']
})
export class OnboardingAddBranchComponent implements OnInit {

  constructor(public authService: AuthService) { }
  branches: Coordinates[] = [];

  ngOnInit(): void {
  }

}
