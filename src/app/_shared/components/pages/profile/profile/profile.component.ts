import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Coordinates } from 'src/app/_shared/interfaces/coordinates';
import { STORAGE_KEY_USER_ID } from 'src/app/_shared/service/auth.service';
import { ProfileService } from 'src/app/_shared/service/profile.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [MessageService],
})
export class ProfileComponent implements OnInit {

    branches: Coordinates[] = [];
    mainForm!: FormGroup;
    profileData!: any;
    handleError: any;
    lSProviderId!: any;
    providerIdFromLStorage: number = 0;
    //providerStatus: string = 'Inactive';
    providerStatus!: string;
    providerStatusId!: number;

    profileImgUrl: any | null;
    licenseUrl: any | null;
    commercialUrl: any | null;


    profileFormData!: any;
    licenseImgId!: number | null
    commercialRecordImgId!: number | null
    logoImgId!: number | null
    isLoading: boolean = false;
    businessTypes = [{ id: 0, name: 'Shop' }, { id: 1, name: 'Veterinary Service' }, { id: 2, name: 'Both' }]

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private router: Router,
        private profileSVC: ProfileService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {

        this.getProviderId();
        this.initiateForm();
    }

    initiateForm() {

        this.mainForm = this.fb.group({
            enName: [''],
            arName: [''],
            email: [''],
            mobile: [{ value: '', disabled: true }],
            commercialRecord: [''],
            license: [''],
            logoImge: [''],
            licenseImge: [''],
            commercialRecordImge: [''],
            businessType: ['']
        });
    }

    getProviderId() {

        this.lSProviderId = localStorage.getItem(STORAGE_KEY_USER_ID);
        if (this.lSProviderId > 0) {
            this.providerIdFromLStorage = JSON.parse(this.lSProviderId);
            this.getProfile(this.providerIdFromLStorage);
        } else {
            console.log('no data in local storage!');
        }
    }

    getProfile(id: number) {

        this.profileSVC.getOne(id).subscribe((res) => {
            console.log('profileData', res);
            this.profileData = res.data;
            this.licenseImgId = this.profileData.licenseImgId
            this.commercialRecordImgId = this.profileData.commercialRecordImgId
            this.logoImgId = this.profileData.logoImgId
            console.log("this.logoImgId", this.logoImgId);
            this.providerStatus = this.profileData.statusStr;
            this.providerStatusId = this.profileData.statusId;
            this.populateData();
            this.disableDocs();
        });
    }

    getImgUrl(id: number, url: string) {

        if (id) {
            this.profileSVC.getImage(id).subscribe((res) => {
                this[url] = res.url;
            });
        }
    }

    disableDocs() {

        if (this.providerStatusId == 1) {
            this.mainForm.get('license')?.disable();
            this.mainForm.get('commercialRecord')?.disable();
            this.mainForm.get('cicenseImge')?.disable();
            this.mainForm.get('commercialRecordImge')?.disable();
        } else {
            return;
        }
    }

    populateData() {

        this.mainForm.patchValue({

            id: this.profileData?.id,
            enName: this.profileData?.fullName,
            arName: this.profileData?.arFullName,
            email: this.profileData?.email,
            mobile: this.profileData?.mobile,
            commercialRecord: this.profileData?.commercialRecord,
            license: this.profileData?.license,
        })

        this.getImgUrl(this.profileData.logoImgId, 'profileImgUrl');
        this.getImgUrl(this.profileData.commercialRecordImgId, 'commercialUrl');
        this.getImgUrl(this.profileData.licenseImgId, 'licenseUrl');
    }

    submit() {

        console.log('this.mainForm', this.mainForm.value);
        console.log('branches', this.branches);

        if (this.mainForm.invalid) {
            this.mainForm.markAllAsTouched();
            this.mainForm.markAsDirty();
            this.mainForm.updateValueAndValidity();
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please Complete Required Field!',
            });
            return;
        }

        let formdata = this.mainForm.value;
        this.profileFormData = new FormData();
        this.profileFormData.append('id', formdata.id);
        this.profileFormData.append('email', formdata.email);
        this.profileFormData.append('enName', formdata.enName);
        this.profileFormData.append('arName', formdata.arName);
        this.profileFormData.append('license', formdata.license)
        this.profileFormData.append('commercialRecord', formdata.commercialRecord);

        formdata.logoImge ? this.profileFormData.append('logoImge', formdata.logoImge, formdata.logoImge?.name) : null
        formdata.licenseImge ? this.profileFormData.append('licenseImge', formdata.licenseImge) : null
        formdata.commercialRecordImge ? this.profileFormData.append('commercialRecordImge', formdata.commercialRecordImge, formdata.commercialRecordImge?.name) : null

        this.profileSVC.updateProfile(this.profileFormData).subscribe((res) => {
            console.log('res', res);
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Profile Updated Successfully!',
            });
            this.getProfile(this.providerIdFromLStorage);
        });
    }

    upload(event: any, image: string, url: any) {

        if (event.target.files.length > 0) {

            this.mainForm.get(image)?.patchValue(<File>event.target.files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(this.mainForm.get(image)?.value);
            reader.onload = () => {

                this[url] = reader.result;
                this[url] = this.sanitizer.bypassSecurityTrustResourceUrl(this[url]);
            };
        }
    }
}
