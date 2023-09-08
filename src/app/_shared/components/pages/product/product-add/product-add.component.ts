import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { STORAGE_KEY_USER_ID } from 'src/app/_shared/service/auth.service';
import { LookupService } from 'src/app/_shared/service/lookup.service';
import { ProductService } from 'src/app/_shared/service/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-product-add',
    templateUrl: './product-add.component.html',
    styleUrls: ['./product-add.component.scss'],
    providers: [MessageService],
})
export class ProductAddComponent implements OnInit {

    category!: string[];
    subCategories: [] = [];
    mainForm!: FormGroup;
    packageData: any;
    addMode: boolean = true;
    isLoading: boolean = false;
    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private router: Router,
        private lookupService: LookupService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private productService: ProductService,
    ) { }
    ngOnInit(): void {

        this.initiateForm();
    }

    onSelectCategory(e: any) {

        let categoryId = e.value;
        console.log('???', categoryId);
        this.subCategories = [];
    }

    initiateForm() {

        this.mainForm = this.fb.group({

            id: this.fb.nonNullable.control(0),
            categoryId: ['', Validators.required],
            subCategory: ['', Validators.required],
            englishName: ['', Validators.required],
            arabicName: ['', Validators.required],
            price: ['', Validators.required],
            description: this.fb.nonNullable.control(''),
            productType: ['', Validators.required],
            productPieces: ['', Validators.required]
        });
    }

    submit() {

        console.log(this.mainForm.value);

        if (this.mainForm.invalid) {

            this.mainForm.markAllAsTouched();
            this.isLoading = false
            return;
        }
        if (this.addMode) {

            this.Add();
        } else {

            this.Update();
        }
    }

    Add() {
        this.isLoading = true
        console.log('Add!!');

        let formdata = this.mainForm.value;
        console.log('formdata', formdata);

        this.productService.addPackage(formdata).subscribe(
            {
                next: (res) => {
                    this.isLoading = false
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Package Created Successfully!',
                    });
                    this.mainForm.reset();
                    this.router.navigate(['product/list']);

                },
                error: (error) => {

                    this.isLoading = false
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error
                    });
                },
                complete: () => {
                    this.isLoading = false
                }
            }


        );
    }

    Update() {

        this.isLoading = true
        console.log('Update!!');

        let formdata = this.mainForm.value;

        this.productService.updatePackage(formdata).subscribe(
            {
                next: (res) => {
                    this.isLoading = false
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Package Updated Successfully!',
                    });
                    this.mainForm.reset();
                    this.router.navigate(['product/list']);
                },
                error: (error) => {
                    this.isLoading = false
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error
                    });
                },
                complete: () => {
                    this.isLoading = false
                }
            }


        );
    }

}
