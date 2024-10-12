import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo2-form',
  templateUrl: './demo2-form.component.html',
  styleUrls: ['./demo2-form.component.css']
})
export class Demo2FormComponent{
  myForm: FormGroup;
  sku: AbstractControl;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'sku': ['',Validators.required]
    });
    this.sku=this.myForm.controls['sku'];
  }


  onSubmit(value: any): void {
    console.log(this.myForm.controls['sku'])
    console.log('you submitted value: ', value.sku);
  }

}
