import { Component, Input, OnInit } from '@angular/core';
import { Coordinates } from '../../interfaces/coordinates';
import { UntypedFormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch-management',
  templateUrl: './branch-management.component.html',
  styleUrls: ['./branch-management.component.scss']
})
export class BranchManagementComponent implements OnInit {

  @Input() hideSaveBtn: boolean = false;
  @Input() branches: Coordinates[] = [];
  addBranchDialogShow: boolean = false;
  selectedCoordinates: Coordinates = { latitude: 0, longitude: 0, name: '' };
  map: any;
  branchName: UntypedFormControl = new UntypedFormControl('', Validators.required);
  removeBranchDialogShow: boolean = false;
  marker: any;
  isLoading: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    this.initMap();
  }

  initMap() {

    let pos = { lat: 24.7136, lng: 46.6753 }
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: pos,
      zoom: 10,
      fullscreenControl: false
    });

    this.getCurrentLocation();
    this.addClickEventOnMap();
  }

  addClickEventOnMap() {

    this.map.addListener('click', (event: any) => {

      const latitude = event.latLng.lat();
      const longitude = event.latLng.lng();

      this.selectedCoordinates = { latitude, longitude };
      this.addBranchDialogShow = true;
    });
  }

  getCurrentLocation() {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.map.setCenter(pos);
        })
    }
  }

  addMarker = (map: any, coordinates: Coordinates) => {

    const marker = new google.maps.Marker({
      position: { lat: coordinates.latitude, lng: coordinates.longitude },
      map: map,
      label: coordinates.name
    });

    marker.addListener('click', () => {

      this.removeBranchDialogShow = true;
      this.marker = marker;
    });
  };

  onAddBranchClick() {

    this.selectedCoordinates.name = this.branchName.value;
    this.addMarker(this.map, this.selectedCoordinates);
    this.branches.push(this.selectedCoordinates);
    this.addBranchDialogShow = false;
  }

  onremoveBranchClick() {

    const index = this.branches.findIndex(branch => branch.name === this.marker.label);
    if (index !== -1) {
      this.branches.splice(index, 1);
      this.marker.setMap(null);
    }
    this.removeBranchDialogShow = false;
  }

  onSaveClick() {

    this.router.navigate(['home']);
  }
}
