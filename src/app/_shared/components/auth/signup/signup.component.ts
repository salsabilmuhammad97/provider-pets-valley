import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, RECAPTCHA_SITE_KEY } from 'src/app/_shared/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';
import { validCustomPattern } from 'src/app/_shared/_helpers/valid-custom-pattern';
import { UserRegisterRequest } from 'src/app/_shared/interfaces/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService],

})
export class SignupComponent implements OnInit {

  valCheck: string[] = ['remember'];
  recaptchaKey: string = RECAPTCHA_SITE_KEY;
  mainForm!: FormGroup;
  isLoading: boolean = false;
  businessTypes !: {}[]
  countries = [
    { code: '+20', value: '20' },
    { code: '+966', value: '966' },
  ];

  constructor(public layoutService: LayoutService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.initiateForm()
    this.businessTypes = [{ id: 0, name: 'Shop' }, { id: 1, name: 'Veterinary Service' }, { id: 2, name: 'Both' }
    ]
  }

  initiateForm() {

    this.mainForm = this.fb.group({

      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['966', [Validators.required]],
      businessType: ['', [Validators.required]],
      license: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      commercialRecord: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  onSubmitSuccess(res: any) {

    if (res) {

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User added successfully!',
      });
      this.router.navigate(['/onboarding/add-branch']);
    }
  }

  onSubmitFalure(error: any) {

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error,
    });
    this.isLoading = false
  }

  submit() {

    this.isLoading = true

    if (this.mainForm.invalid) {

      this.mainForm.markAllAsTouched();
      this.isLoading = false
      return;
    }

    const phoneNumber = this.route.snapshot.params['phone'];
    let formdata = this.mainForm.value;

    const data: UserRegisterRequest = {
      phoneNumber,
      username: formdata.name,
      email: formdata.email,
      providerData: {
        businuessType: formdata.businessType,
        license: formdata.license,
        commercialRecord: formdata.commercialRecord
      }
    }

    this.authService.register(data).subscribe({

      next: (res) => this.onSubmitSuccess(res),
      error: (error) => this.onSubmitFalure(error),
      complete: () => this.isLoading = false
    });
  }

  onRecaptchaClick(event: { response: string }) {

    this.mainForm.get('recaptcha')?.setValue(event.response);
  }

}

