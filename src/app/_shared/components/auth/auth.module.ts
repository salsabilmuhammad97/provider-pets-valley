import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { OtpComponent } from './otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { CaptchaModule } from 'primeng/captcha';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    InputNumberModule,
    ReactiveFormsModule,
    InputMaskModule,
    NgOtpInputModule,
    ToastModule,
    ProgressSpinnerModule,
    DropdownModule,
    CaptchaModule
  ],
  declarations: [
    SignupComponent,
    OtpComponent
  ]
})
export class AuthModule { }
