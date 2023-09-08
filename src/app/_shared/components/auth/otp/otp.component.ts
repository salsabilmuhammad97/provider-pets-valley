import { Component, OnInit } from '@angular/core';
import { AuthService, STORAGE_KEY_USER_ID, STORAGE_REFRESH_TOKEN, STORAGE_TOKEN_EXPIRES_IN } from 'src/app/_shared/service/auth.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss'],
    providers: [MessageService],
})
export class OtpComponent implements OnInit {

    timer = 60;
    otpControl = new FormControl('', [Validators.required, Validators.minLength(4)])
    isSubmit: boolean = false;
    isSubmitLoading: boolean = false
    isResendCodeLoading: boolean = false
    otpid: string | null = '';
    otpSecret: string | null = '';

    constructor(
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {

        setInterval(() => {
            if (this.timer > 0) {
                this.timer--
            }
        }, 1000)
    }

    onOtpChange() {

        if (this.otpControl.valid) {

            this.submit();
        }
    }

    onSubmitSuccess(res: any) {

        if (res.data) {

            this.authService.setAuthenticationToken(res.data.accessToken.secret);
            localStorage.setItem(STORAGE_REFRESH_TOKEN, JSON.stringify(res.data.refreshToken));
            localStorage.setItem(STORAGE_TOKEN_EXPIRES_IN, JSON.stringify(res.data.accessToken.expiresAt));

            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Logged In Successfully!',
            });
            this.router.navigate(['/onboarding/add-branch']);

            //   this.router.navigate(['/auth/signup']);
        }

    }

    onSubmitFailure(error: any) {

        //TODO: Remove this line
        this.router.navigate(['/onboarding/add-branch']);

        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error,
        });
        this.isSubmitLoading = false;
        this.isResendCodeLoading = false;
    }

    submit() {

        this.otpid = this.activatedRoute.snapshot.params['id'];
        this.otpSecret = this.activatedRoute.snapshot.queryParams['otpSecret'];
        this.isSubmitLoading = true;

        const data = {
            otpid: this.otpid,
            otpSecret: this.otpSecret,
            otpValue: this.otpControl.value,
        }

        this.authService.otpVerify(data).subscribe({
            next: (res) => this.onSubmitSuccess(res),
            error: (error) => this.onSubmitFailure(error),
            complete: () => this.isSubmitLoading = false
        });
    }

    onResendOtpClick() {

        this.otpid = this.activatedRoute.snapshot.params['id'];
        this.otpSecret = this.activatedRoute.snapshot.queryParams['otpSecret'];
        this.isResendCodeLoading = true;
        const data = {
            otpid: this.otpid,
            otpSecret: this.otpSecret,
            otpValue: this.otpControl.value,
        }
        this.authService.resendOtp(data).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'OTP Sent Successfully!',
                });
                this.timer = 60;
                this.router.navigate([`auth/otp/${res.data.id}`], { queryParams: { otpSecret: res.data.otpSecret } });
            },
            error: (error) => console.error(error),
            complete: () => this.isResendCodeLoading = false
        });
    }
}
