import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rate-add',
  templateUrl: './rate-add.component.html',
  styleUrls: ['./rate-add.component.scss']
})
export class RateAddComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  mainForm!: FormGroup;
  isLoading: boolean = false;

  ngOnInit(): void {

    this.initiateForm();
  }

  initiateForm() {

    this.mainForm = this.fb.group({

      rateValue: ['', Validators.required],
      comment: [''],
    });
  }

  submit() {

    console.log(this.mainForm.value);

  }
}
