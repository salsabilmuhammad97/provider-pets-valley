import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProviderService } from 'src/app/_shared/service/admin/provider.service';
import { LookupService } from 'src/app/_shared/service/lookup.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-provider-details',
  templateUrl: './provider-details.component.html',
  styleUrls: ['./provider-details.component.scss'],
  providers: [MessageService]
})
export class ProviderDetailsComponent implements OnInit {
  isLoading: boolean = false;
  dropdownItems = [
    { id: 0, name: 'Select from list' },
    { id: 1, name: 'category1' },

  ];
  category!: string[];
  providerState: {}[] = [
    { id: 1, name: 'Accepted' },
    { id: 2, name: 'Rejected' },
    { id: 3, name: 'Pending' },
  ]
  weekDays: any = [];
  today = new Date()

  mainForm!: FormGroup;
  handleError: any;
  handleUpdateResponse: any;
  providerId!: number;
  dropdownDefaultValue = Object.freeze({
    id: '',
    arabicName: 'إختر من القائمة',
    name: 'Select from list',
  });
  providerInfo!: any;
  constructor(public layoutService: LayoutService,
    private fb: FormBuilder,
    private router: Router,
    private lookupService: LookupService,
    private route: ActivatedRoute,
    private providerService: ProviderService,
    private messageService: MessageService

  ) { }

  ngOnInit(): void {

    this.initiateForm()

    this.gitLookupOnStart()
    this.getUrlId();
  }




  getUrlId() {
    this.route.params.subscribe(params => {
      this.providerId = params['id']
    });

    console.log(this.providerId);
    this.getProviderById(this.providerId)
  }




  getProviderById(id: number) {
    this.providerService.getOne(id).subscribe(
      (res) => {
        console.log("eeee", res);

        this.providerInfo = res.data;

        this.populateData();
      }
    )
  }


  initiateForm() {
    this.mainForm = this.fb.group({
      id: this.fb.nonNullable.control(null),
      statusId: this.fb.nonNullable.control(null)
    });

  }


  populateData() {
    this.mainForm.get('statusId')?.patchValue(this.providerInfo?.statusId)
  }




  submit() {
    this.isLoading = true
    console.log("btn works!!");
    if (this.mainForm.invalid) {
      this.mainForm.markAllAsTouched()
      this.mainForm.markAsDirty()
      this.mainForm.updateValueAndValidity();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Complete Required Field!' });
      this.isLoading = false
      return;
    }
    let formdata = this.mainForm.value
    console.log("formdata", formdata);
    formdata.id = this.providerId
    console.log("formdata", formdata);
    this.providerService.providerAction(formdata).subscribe(
      {
        next: (res) => {
          this.isLoading = false
          console.log("res", res);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Status Updated successfully!' });
          this.mainForm.reset();
          setTimeout(() => {
            this.router.navigate(['../../list'], { relativeTo: this.route });
          }, 1600)
        },
        error: (error) => {
          this.isLoading = false
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message ? error.error.message : 'Something went wrong!',
          });
        },
        complete: () => {
          this.isLoading = false
        }
      }



    )

  }
  /////''
  gitLookupOnStart() {
    // this.lookupService
    //   .getCategories().subscribe({
    //     next: this.handleUpdateResponse?.bind(this),
    //     error: this.handleError?.bind(this)
    //   });
    // this.category = ['select from list', ...this.handleUpdateResponse];
    // console.log("🚀 ~ this.category", this.category);

    // this.providerState = [this.providerState];

    // this.lookupService.getCategories().subscribe(
    //   (data) => {
    //     this.providerState = [this.dropdownDefaultValue, ...data];

    //   }
    // )
  }

}



//package
//pagination


//provider list (search)
//provider status lookup
//user auth
//service edit
//days as multiselect dropdown
//admin dashboard api
//provider dashboard api


//Hossam
//admin- provider edit page ui
