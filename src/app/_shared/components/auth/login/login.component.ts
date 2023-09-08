import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { UserLoginRequest, UserLoginResponse } from 'src/app/_shared/interfaces/user';
import { AuthService, COOKIE_KEY_EMAIL, COOKIE_KEY_PASSWORD, ENCRYPT_SECRET_KEY, RECAPTCHA_SITE_KEY } from 'src/app/_shared/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService],
})

export class LoginComponent {

    recaptchaKey: string = RECAPTCHA_SITE_KEY;
    isLoading: boolean = false;
    mainForm!: FormGroup;
    isLogin: boolean = false;
    countries = [
        { code: '+20', value: '20' },
        { code: '+966', value: '966' },
    ];

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService,
        private cookieService: CookieService
    ) { }

    ngOnInit(): void {

        this.initiateForm();
        this.autoPatchRememberMeValues();
    }

    autoPatchRememberMeValues() {

        if (this.cookieService.check(COOKIE_KEY_EMAIL)) {

            this.mainForm.get('email')?.patchValue(this.cookieService.get(COOKIE_KEY_EMAIL));
        }
        if (this.cookieService.check(COOKIE_KEY_PASSWORD)) {

            const decryptedPass = CryptoJS.AES.decrypt(this.cookieService.get((COOKIE_KEY_PASSWORD)), ENCRYPT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
            this.mainForm.get('password')?.patchValue(decryptedPass);
        }

    }

    initiateForm() {

        this.mainForm = this.fb.group({
            countryCode: ['966', [Validators.required]],
            phoneNumber: ['', [Validators.required]],
            recaptcha: ['', Validators.required],
            rememberMe: [false]
        });
    }

    onSubmitSuccess(res: UserLoginResponse) {

        const formdata = this.mainForm.value;
        if (res.data) {

            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Please enter the code (OTP) sent to your phone!',
            });

            this.router.navigate([`auth/otp/${formdata.countryCode + formdata.phoneNumber.replace(/[() -]/g, '')}`]);
        }
    }

    onSubmitFailure(error: any) {

        const formdata = this.mainForm.value;
        console.log(error);

        if (error === 'You are not authorized') {

            this.router.navigate([`auth/otp/${formdata.countryCode + formdata.phoneNumber.replace(/[() -]/g, '')}`], { queryParams: { newUser: true } });
        } else {
            // TODO : Remove this line
            this.router.navigate([`auth/otp/${formdata.countryCode + formdata.phoneNumber.replace(/[() -]/g, '')}`], { queryParams: { newUser: true } });
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error,
            });
        }
        this.isLoading = false;
    }

    submit() {

        this.isLoading = true
        if (this.mainForm.invalid) {

            this.mainForm.markAllAsTouched();
            this.isLoading = false
            return;
        }

        const formdata = this.mainForm.value;

        this.handleRememberMe(formdata.rememberMe);
        const data: UserLoginRequest = {
            phoneNumber: formdata.countryCode + formdata.phoneNumber.replace(/[() -]/g, ''),
            recaptchaResponseValue: formdata.recaptcha
        }

        this.authService.login(data).subscribe({

            next: (res) => this.onSubmitSuccess(res),
            error: (error) => this.onSubmitFailure(error),
            complete: () => this.isLoading = false
        })
    }

    handleRememberMe(rememberMe: boolean) {

        if (rememberMe) {

            const encryptedPass: any = CryptoJS.AES.encrypt(this.mainForm.get('phone')?.value, ENCRYPT_SECRET_KEY);

            this.cookieService.set(COOKIE_KEY_EMAIL, this.mainForm.get('email')?.value)
            this.cookieService.set(COOKIE_KEY_PASSWORD, encryptedPass)
        }
    }

    onRecaptchaClick(event: { response: string }) {

        this.mainForm.get('recaptcha')?.setValue(event.response);
    }

}

