import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { STORAGE_KEY_USER_ID } from 'src/app/_shared/service/auth.service';
import { LookupService } from 'src/app/_shared/service/lookup.service';
import { ProviderServicesService } from 'src/app/_shared/service/provider-services.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-add-service',
    templateUrl: './add-service.component.html',
    styleUrls: ['./add-service.component.scss'],
    providers: [MessageService],
})
export class AddServiceComponent implements OnInit {
    selectedDay!: any;
    dayPicked: boolean = false;
    category!: string[];
    weekDays: any = [];
    expMinDate: Date = new Date();
    today = new Date();
    daysList: number[] = [];
    week = [
        { id: 1, name: 'Saturday' },
        { id: 2, name: 'Sunday' },
        { id: 3, name: 'Monday' },
        { id: 4, name: 'Tuesday' },
        { id: 5, name: 'Wednesday' },
        { id: 6, name: 'Thursday' },
        { id: 7, name: 'Friday' },
    ];
    actionButton: string = 'Submit';
    id!: number;
    mainForm!: FormGroup;
    handleError: any;
    handleUpdateResponse: any;
    serviceData: any = {};
    servDays!: any;
    addMode: boolean = true;
    dropdownDefaultValue = Object.freeze({
        id: 0,
        arabicName: 'إختر من القائمة',
        name: 'Select from list',
    });
    toggle: boolean = true;
    lSProviderId!: any;
    providerIdFromLStorage: number = 0;
    calendarVal?: Date;
    daysArr: any[] = [];
    dataSplit: {} = {};
    autoReply: boolean = false;
    autoReplyValue: string = '';
    discount1: number = 0;
    discount2: number = 0;
    discount3: number = 0;
    isLoading: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private router: Router,
        private providerServicesService: ProviderServicesService,
        private lookupService: LookupService,
        private messageService: MessageService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.gitLookupOnStart();
        this.getUrlId();
        this.getProviderId();
    }

    getProviderId() {
        this.lSProviderId = localStorage.getItem(STORAGE_KEY_USER_ID);
        if (this.lSProviderId > 0) {
            this.providerIdFromLStorage = JSON.parse(this.lSProviderId);
        } else {
            console.log('no data in local storage!');
        }
    }

    gitLookupOnStart() {
        // this.isLoading = true;

        this.lookupService.getCategories().subscribe((data: any) => {
            console.log('data', data);

            this.category = data;
            this.isLoading = false;
        });
        this.initiateForm();
    }

    getUrlId() {
        if (this.route.params) {
            this.route.params.subscribe((params) => {
                this.id = params['id'];
            });
        }

        if (this.id > 0) {
            this.actionButton = 'Edit';
            this.addMode = false;

            this.getServiceById(this.id);
            this.serviceDays.removeAt(0);
        }
    }

    initiateForm() {
        this.mainForm = this.fb.group({
            id: this.fb.nonNullable.control(null),
            categoryId: this.fb.nonNullable.control('', {
                validators: [Validators.required],
            }),
            englishName: this.fb.nonNullable.control('', {
                validators: [Validators.required, Validators.minLength(3)],
            }),
            arabicName: this.fb.nonNullable.control('', {
                validators: [Validators.required, Validators.minLength(3)],
            }),
            price: this.fb.nonNullable.control(null, {
                validators: [Validators.required],
            }),
            discount1: this.fb.nonNullable.control(null),
            discount2: this.fb.nonNullable.control(null),
            discount3: this.fb.nonNullable.control(null),
            description: this.fb.nonNullable.control(''),
            dateFrom: this.fb.nonNullable.control(null),
            dateTo: this.fb.nonNullable.control(null),
            autoReply: this.fb.nonNullable.control(false),
            isActive: this.fb.nonNullable.control(false),
            serviceEstTimeInMin: this.fb.nonNullable.control(null, {
                validators: [Validators.required],
            }),
            serviceDays: this.fb.nonNullable.array([this.newServiceInfo()]),
        });

        this.mainForm.get('autoReply')?.valueChanges.subscribe((value) => {
            console.log('autoReply', value);
            if (value === true) {
                this.autoReply = true;

                this.mainForm
                    .get('discount1')
                    ?.setValidators(Validators.required);
                this.mainForm.get('discount1')?.updateValueAndValidity();
                // this.mainForm
                //     .get('discount2')
                //     ?.setValidators(Validators.required);
                // this.mainForm.get('discount2')?.updateValueAndValidity();
                // this.mainForm
                //     .get('discount3')
                //     ?.setValidators(Validators.required);
                // this.mainForm.get('discount3')?.updateValueAndValidity();

                //set autoreply value when autoreply is on and no discount values yet!
                this.autoReplyValue =
                    this.mainForm.get('discount1')?.value +
                    this.mainForm.get('discount2')?.value +
                    this.mainForm.get('discount3')?.value +
                    '%';
            } else {
                this.autoReply = false;
                this.mainForm
                    .get('discount1')
                    ?.removeValidators(Validators.required);
                this.mainForm.get('discount1')?.updateValueAndValidity();
                // this.mainForm
                //     .get('discount2')
                //     ?.removeValidators(Validators.required);
                // this.mainForm.get('discount2')?.updateValueAndValidity();
                // this.mainForm
                //     .get('discount3')
                //     ?.removeValidators(Validators.required);
                // this.mainForm.get('discount3')?.updateValueAndValidity();
            }
        });
    }

    get serviceDays(): FormArray {
        return this.mainForm.get('serviceDays') as FormArray;
    }

    onAddDiscount(e: any) {
        console.log(e);
        this.discount1 = e.value;
        this.autoReplyValue =
            this.discount1 + this.discount2 + this.discount3 + '%';
    }
    onAddDiscount2(e: any) {
        console.log(e);
        this.discount2 = e.value;
        this.autoReplyValue =
            this.discount1 + this.discount2 + this.discount3 + '%';
    }
    onAddDiscount3(e: any) {
        console.log(e);
        this.discount3 = e.value;
        this.autoReplyValue =
            this.discount1 + this.discount2 + this.discount3 + '%';
    }

    newServiceInfo(item?: any): FormGroup {
        return this.fb.group({
            dayId: [
                item?.dayId ? item?.dayId : null,
                { validators: [Validators.required] },
            ],
            serviceMaxCountInDay: [0],
            slotStartTime: [
                item?.slotStartTime ? item?.slotStartTime : '',
                { validators: [Validators.required] },
            ],
            slotEndTime: [
                item?.slotEndTime ? item?.slotEndTime : '',
                { validators: [Validators.required] },
            ],
        });
    }

    addServiceInfo() {

        this.serviceDays.push(this.newServiceInfo());
    }

    removeDay(i: number) {

        if (this.serviceDays.length > 1) {

            this.serviceDays.removeAt(i);
        }
    }

    getServiceById(id: number) {
        this.providerServicesService.getOne(id).subscribe((res) => {
            console.log("res", res);

            this.serviceData = res.data;
            if (this.serviceData.dateFrom == null) {
                this.serviceData.dateFrom = new Date();
            }
            if (this.serviceData.dateTo == null) {
                this.serviceData.dateTo = new Date();
            }
            this.servDays = this.serviceData?.serviceDays?.map(
                (d: any) => d.dayId
            );
            this.populateData();
        });
    }

    IgnoreObjNullValue(obj: any): any {
        if (!obj) return;
        const oldObj = Object.keys(obj).filter(
            (item) => obj[item] != undefined || obj[item] != null
        );
        const newObj = {};
        oldObj.forEach((item) => Object.assign(newObj, { [item]: obj[item] }));
        return newObj;
    }

    populateData() {
        this.mainForm.get('id')?.patchValue(this.serviceData?.id);
        this.mainForm
            .get('categoryId')
            ?.patchValue(this.serviceData?.categoryId);
        this.mainForm
            .get('englishName')
            ?.patchValue(this.serviceData?.englishName);
        this.mainForm
            .get('arabicName')
            ?.patchValue(this.serviceData?.arabicName);
        this.mainForm.get('price')?.patchValue(this.serviceData?.price);
        this.mainForm.get('discount1')?.patchValue(this.serviceData?.discount1);
        this.mainForm.get('discount2')?.patchValue(this.serviceData?.discount2);
        this.mainForm.get('discount3')?.patchValue(this.serviceData?.discount3);
        this.mainForm
            .get('description')
            ?.patchValue(this.serviceData?.description);
        this.mainForm
            .get('dateFrom')
            ?.patchValue(new Date(this.serviceData?.dateFrom));
        this.mainForm
            .get('dateTo')
            ?.patchValue(new Date(this.serviceData?.dateTo));

        this.mainForm.get('serviceDays')?.patchValue(this.servDays);

        this.mainForm.get('autoReply')?.patchValue(this.serviceData?.autoReply);
        this.mainForm.get('isActive')?.patchValue(this.serviceData?.isActive);
        this.mainForm
            .get('serviceEstTimeInMin')
            ?.patchValue(this.serviceData?.serviceEstTimeInMin);

        //populate slots
        this.serviceData?.serviceDays?.map((slot: any) => {
            let date1 = new Date();
            let date2 = new Date();
            let slotEndTime = slot.slotEndTime.split(/[ :]+/);
            let slotStartTime = slot.slotStartTime.split(/[ :]+/);
            date1.setHours(slotEndTime[0], slotEndTime[1], 0);
            date2.setHours(slotStartTime[0], slotStartTime[1], 0);
            slot.slotEndTime = date1;
            slot.slotStartTime = date2;
            this.serviceDays.push(this.newServiceInfo(slot));
        });
    }
    splitTime(time: any) {
        let t = time.split(/[ :]+/);
        let date = new Date();
        time = date.setHours(t[0], t[1], 0);
        console.log(' slot ', time);
        return time;
    }

    getTime(slot: Date) {
        let hour = new Date(slot).getHours();
        let minute = new Date(slot).getMinutes();
        let time = `${hour}:${minute < 10 ? '0' + minute : minute}`;
        return time;
    }

    onStartDateSelect(e: any) {
        this.mainForm.get('dateTo')?.reset();
        this.expMinDate = new Date(e);
    }

    submit() {

        console.log(this.mainForm.value);
        if (this.mainForm.invalid) {

            this.mainForm.markAllAsTouched();
            return;
        }
        if (this.addMode) {
            this.add();
        } else {
            this.edit();
        }
    }
    add() {
        this.isLoading = true;
        let formdata = this.mainForm.value;
        console.log('finalData', formdata);
        // formdata.serviceDays?.map((slot: any) => {
        //     slot.slotEndTime = this.getTime( slot.slotStartTime)
        //     slot.slotStartTime = this.getTime( slot.slotStartTime)
        //   })
        let finalData = {
            providerId: this.providerIdFromLStorage,
            ...formdata,
        };

        finalData = this.IgnoreObjNullValue(finalData);
        console.log('finalData', finalData);

        this.providerServicesService.addService(finalData).subscribe(
            {
                next: (res) => {
                    if (res) {
                        this.isLoading = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Service Created Successfully!',
                        });
                        setTimeout(() => {
                            this.mainForm.reset();
                            this.router.navigate(['../list'], {
                                relativeTo: this.route,
                            });
                        }, 1600);
                    }

                },
                error: (error) => {
                    this.isLoading = false;
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.error.message
                            ? error.error.message
                            : 'Something went wrong!',
                    });
                },
                complete: () => {
                    this.isLoading = false;
                    setTimeout(() => {
                        this.mainForm.reset();
                        this.router.navigate(['../list'], {
                            relativeTo: this.route,
                        });
                    }, 1600);
                },
            }


        );
    }

    edit() {
        this.isLoading = true;
        let formdata = this.mainForm.value;
        console.log('formdata', formdata);

        formdata.serviceDays.map((t: any) => {
            if (t.slotEndTime.toString().indexOf('GMT') > -1) {
                t.slotEndTime = this.getTime(t.slotEndTime);
                t.slotStartTime = this.getTime(t.slotStartTime);
            } else {
                console.log(t.slotEndTime);
            }
        });

        let finalData = {
            providerId: this.providerIdFromLStorage,
            ...formdata,

            statusId: this.serviceData?.statusId,
        };
        finalData = this.IgnoreObjNullValue(finalData);
        this.providerServicesService.updateService(finalData).subscribe(
            {
                next: (res) => {
                    this.isLoading = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Service Updated Successfully!',
                    });
                    setTimeout(() => {
                        this.mainForm.reset();
                        this.router.navigate(['../../list'], {
                            relativeTo: this.route,
                        });
                    }, 1600);
                },
                error: (error) => {
                    this.isLoading = false;
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.error.message
                            ? error.error.message
                            : 'Something went wrong!',
                    });
                },
                complete: () => {
                    this.isLoading = false;
                }
            }


        );
    }

    onSelect(e: any, day: any, Index: any): void {
        // this.dayPicked =  !this.dayPicked
        // this.selectedDay = day
        // console.log(" this.selectedDay",  this.selectedDay.id);
        // this.daysList.push(this.selectedDay.id);
        // console.log("daylist", this.daysList);
        // let uniqueChars = [...new Set(this.daysList)];
        //     console.log("eeeee",uniqueChars);
        //    this.dayPicked =  !this.dayPicked
        //   console.log(" this.dayPicked", this.dayPicked);
        //add day to list
        // if day == day in the list remove
        // if not add it
        //change it's inside change it's color
        // this.daysArr.push(day);
        // console.log("daysArr",this.daysArr);
    }

    onSelectTime($event: any) {
        // console.log('time', $event);
        // let hour = new Date($event).getHours();
        // let minute = new Date($event).getMinutes();
        // let second = new Date($event).getSeconds();
        // this.dataSplit = {
        //     hours: hour,
        //     minutes: minute,
        //     seconds: second,
        //     ticks: 0,
        //     days: 0,
        //     milliseconds: 0,
        // };
        // console.log('this.dataSplit', this.dataSplit);
    }

    onSelectStartTime($event: any, i: number): void {
        // console.log(i, $event, 'onSelectStartTime');
        // let hour = new Date($event).getHours();
        // let minute = new Date($event).getMinutes();
        // if(minute < 10) {
        //     this.dataSplit = `0${minute}`;
        //     this.dataSplit = `${hour}:0${minute}`
        // }else{
        //     this.dataSplit = `${hour}:${minute}`
        // }
        // console.log("this.dataSplit", this.dataSplit);
        // this.serviceDays.value[i].slotStartTime = this.dataSplit
        // console.log("this.serviceDays[i]", this.serviceDays.value[i]);
        // let second = new Date($event).getSeconds();
        // this.dataSplit = {
        //         hours: hour,
        //         minutes: minute,
        //         seconds: second,
        //         ticks: 0,
        //         days: 0,
        //         milliseconds: 0
        //        }
    }
}
