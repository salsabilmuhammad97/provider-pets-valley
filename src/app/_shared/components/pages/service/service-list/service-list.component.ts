import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Customer } from 'src/app/_shared/interfaces/customer';
import { Services } from 'src/app/_shared/interfaces/services';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { STORAGE_KEY_USER_ID } from 'src/app/_shared/service/auth.service';
import { ProviderServicesService } from 'src/app/_shared/service/provider-services.service';
interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'app-service-list',
    templateUrl: './service-list.component.html',
    styleUrls: ['./service-list.component.scss'],
})
export class ServiceListComponent implements OnInit {
    @ViewChild('dt')
    searchForm!: FormGroup<{
        name: FormControl<string>;
    }>;
    mainForm!: FormGroup;
    customers1: Customer[] = [];
    status: {}[] = [];
    services: Services[] = [];
    loading: boolean = true;
    providerServicesServices: Services[] = [];
    categoryName!: any;
    categoryId!: number;
    pageSize!: number;
    totalCount!: number;
    rowsPerPage: number[] = [5, 10, 15];
    totalPages!: Number;
    first: number = 0;
    dataTable!: any;
    pageNumber!: number;
    lSProviderId!: any;
    providerIdFromLStorage!: any;


    ////////


    ////////////////////////////////////////////////////////////////

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private fb: FormBuilder,
        private providerServicesService: ProviderServicesService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.initiateForm();
        this.getProviderId();
        this.status = [
            { label: 'Inactive', value: 'Inactive' },
            { label: 'Active', value: 'Active' },
            { label: 'Pending', value: 'Pending' },
        ];
    }

    getProviderId() {
        this.lSProviderId = localStorage.getItem(STORAGE_KEY_USER_ID);
        console.log(" this.lSProviderId ", this.lSProviderId);

        if (this.lSProviderId > 0) {
            this.providerIdFromLStorage = JSON.parse(this.lSProviderId);
            console.log(" this.providerIdFromLStorage", this.providerIdFromLStorage);

            this.getAllServices(this.providerIdFromLStorage);
        } else {
            console.log('no data in local storage!');
            this.loading = false;
        }
    }
    getAllServices(providerId: number, pageNumber = 1, pageSize = 10) {

        this.providerServicesService
            .getAll(providerId, pageNumber, pageSize)
            .subscribe({
                next: (res) => {
                    this.loading = false;
                    this.services = res.data?.results;
                    this.dataTable = res.data;
                    this.pageSize = res.data?.pageSize;
                    this.totalCount = res.data?.totalCount;
                    this.totalPages = res.data?.totalPages;
                    this.services.forEach(
                        (s) => (s.dateFrom = new Date(s.dateFrom))
                    );
                    this.services.forEach(
                        (s) => (s.dateTo = new Date(s.dateTo))
                    );
                },
                error: (error) => {
                    this.loading = false;
                    console.log("error.error.message", error.error.message);

                },
                complete: () => {
                    this.loading = false;
                }
            }


                //     (res) => {
                //     this.loading = false;
                //     this.services = res.data?.results;
                //     this.dataTable = res.data;
                //     this.pageSize = res.data?.pageSize;
                //     this.totalCount = res.data?.totalCount;
                //     this.totalPages = res.data?.totalPages;
                //     this.services.forEach(
                //         (s) => (s.dateFrom = new Date(s.dateFrom))
                //     );
                //     this.services.forEach(
                //         (s) => (s.dateTo = new Date(s.dateTo))
                //     );
                //     this.loading = false;
                // }
            );
    }

    paginate(event: any) {
        let pageIndex = event.first / event.rows + 1; // Index of the new page if event.page not defined.
        this.pageNumber = pageIndex;
        this.pageSize = event.rows;

        console.log("this.providerIdFromLStorage", this.providerIdFromLStorage);

        this.getAllServices(
            this.providerIdFromLStorage,
            this.pageNumber,
            this.pageSize
        );
    }

    paginate2(event: LazyLoadEvent) {
        console.log(event);
        this.loading = true;

        setTimeout(() => {
            this.providerServicesService.search({ lazyEvent: JSON.stringify(event) }).subscribe((res) => {
                console.log(res);
                this.loading = false;
            })
        }, 1000);
        this.getAllServices(
            this.providerIdFromLStorage,
            this.pageNumber,
            this.pageSize
        );
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    edit(data: any) {
        let Id = data.id;
        this.router.navigate([`../edit/${Id}`], { relativeTo: this.route });
    }

    // search
    initiateForm() {
        this.mainForm = this.fb.group({
            name: this.fb.nonNullable.control(''),
        });
    }

    submitSearchForm(e: any) {
        let formdata = this.mainForm.value;
        console.log('formdata', formdata);
        let finalFormData = {
            ...formdata,
            providerId: this.providerIdFromLStorage,
        };
        console.log(finalFormData);

        console.log('clicked!', e.value);
        this.providerServicesService.search(finalFormData).subscribe((res) => {
            console.log('search data', res);
            //this.services = res.data;
        });
    }




}
