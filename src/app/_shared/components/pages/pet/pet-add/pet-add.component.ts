import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pet-add',
  templateUrl: './pet-add.component.html',
  styleUrls: ['./pet-add.component.scss']
})
export class PetAddComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }
  mainForm!: FormGroup;
  category!: string[];
  subCategories: [] = [];
  isLoading: boolean = false;

  ngOnInit(): void {

    this.initiateForm();
  }

  onSelectCategory(e: any) {
    let categoryId = e.value;
    console.log('???', categoryId);
    this.subCategories = [];
  }

  submit() {
    console.log(this.mainForm.value);

  }

  initiateForm() {

    this.mainForm = this.fb.group({
      id: this.fb.nonNullable.control(0),
      categoryId: ['', Validators.required],
      englishName: ['', Validators.required],
      arabicName: ['', Validators.required],
      price: ['', Validators.required],
      description: this.fb.nonNullable.control(''),
      subCategory: ['', Validators.required],
      petType: ['', Validators.required],
      petAge: ['', Validators.required]
    });
  }

}
