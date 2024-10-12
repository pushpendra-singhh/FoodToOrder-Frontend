import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Address } from 'src/app/models/address';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/restaurant.service';

@Component({
  selector: 'app-restaurant-add',
  templateUrl: './restaurant-add.component.html',
  styleUrls: ['./restaurant-add.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class RestaurantAddComponent {
  // addedRestaurants:Restaurant[]=[]
  // constructor(private restaurantService:RestaurantService){
  //   this.addedRestaurants=this.restaurantService.getAddedRestaurants()
  // }
// whether_disable:boolean=;

  firstFormGroup = this._formBuilder.group({
    // firstCtrl: ['', Validators.required],
    r_Name: ['', Validators.required],
    r_Img_Path: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
    house_No: ['', Validators.required],
      street: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['',Validators.required]
  });
  isLinear = false;

  count=0;
  arrRestaurants:Restaurant[]=[]
  public addressForm: FormGroup;
  restaurant: Restaurant;
  countSecondFormSubmit = 0;
  addresses: Restaurant[]=[];
  public dishForm: FormGroup;
  countDish=0;
  countThirdFormSubmit = 0;
  formdata:any;
  constructor(private _formBuilder: FormBuilder,private restaurantService:RestaurantService) {
   function saveFirstStepData(data:any){
    // this.formdata=data.value;
   }
    //this.arrRestaurants=this.restaurantService.getRestaurants();
    this.restaurantService.getRestaurants().subscribe(data=>{
      this.arrRestaurants=data
    })

    this.addressForm = this._formBuilder.group({
      form_array_addresses: this._formBuilder.array([this.createAddressFormGroup()])
    })

    this.dishForm = this._formBuilder.group({
      form_array_dishes: this._formBuilder.array([this.createDishFormGroup()])
    })

    this.restaurant=new Restaurant(0,'','',[],[],0);
  }

  private createAddressFormGroup(): FormGroup {
    this.count++;
    return new FormGroup({
      'id': new FormControl('', Validators.required),
      'house_No': new FormControl('', Validators.required),
      'street': new FormControl('', Validators.required),
      'area': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'pincode': new FormControl('', Validators.required)
    })
  }

  private createDishFormGroup(): FormGroup {
    this.countDish++;
    return new FormGroup({
      'id': new FormControl('', Validators.required),
      // 'rest_id': new FormControl('', Validators.required),
      'd_Name': new FormControl('', Validators.required),
      'd_Cost': new FormControl('', Validators.required),
      'd_Description': new FormControl('', Validators.required),
      'd_Category': new FormControl('', Validators.required),
      'd_Composition': new FormControl('',Validators.required),
      'd_Type': new FormControl('', Validators.required)
    })
  }

  saveFirstStepData(formdata:FormGroup){
    let tempId = 0;
    let maxId = 0;
    this.arrRestaurants.forEach(s => {
      if (maxId < s.id) {
        maxId = s.id;
      }
    })
    tempId = maxId
    tempId++
    console.log(formdata)
    this.restaurant.id=tempId;
    this.restaurant.r_Name=formdata.value['r_Name'];
    this.restaurant.r_Img_Path=formdata.value['r_Img_Path'];
    console.log(this.restaurant.r_Img_Path);
  }

  saveSecondStepData(formdata: FormGroup){
     // alert(this.addressForm.controls['form_array_addresses'].invalid);
    // console.log("form errors"+this.addressForm.controls)
    // console.log(this.addressForm);
    this.countSecondFormSubmit++;
    if (this.countSecondFormSubmit == this.count) {
      // this.addresses=Object.values(formdata);
      // console.log(formdata);
      let adressArr = Object.values(formdata);
      let count = 1;
      adressArr.forEach((a) => {        
       
      });
      this.addresses = adressArr;
      let temp = JSON.parse(JSON.stringify(this.addresses));
      this.restaurant.r_Addresses = temp[0];
      this.restaurant.r_Addresses.forEach((a,i)=>{
        a.id=i+1
      })
      console.log(this.restaurant.r_Addresses);
      // this.restaurantService.addRestaurant(this.restaurant)
      // alert("Supplier added Succesfully")
      // console.log(this.restaurant)
    }
  }

  form_array_addresses(): FormArray {
    return this.addressForm.get("form_array_addresses") as FormArray
  }

  public removeOrClearAddress(i: number) {
    const form_array_addresses = this.addressForm.get('form_array_addresses') as FormArray
    if (form_array_addresses.length > 1) {
      form_array_addresses.removeAt(i)
    }
    else {
      form_array_addresses.reset()
    }
  }

  public addAddressFormGroup() {
    const form_array_addresses = this.addressForm.get('form_array_addresses') as FormArray
    form_array_addresses.push(this.createAddressFormGroup())
  }

  saveThirdStepData(formdata: FormGroup){
    this.countThirdFormSubmit++;
    if (this.countThirdFormSubmit == this.countDish) {
      // this.addresses=Object.values(formdata);
      // console.log(formdata);
      let dishArr = Object.values(formdata);
      let count = 1;
      dishArr.forEach((a) => {        
       
      });
      this.addresses = dishArr;
      let temp = JSON.parse(JSON.stringify(this.addresses));
      this.restaurant.r_Dishes = temp[0];
      this.restaurant.r_Dishes.forEach((a,i)=>{
        a.id=i+1
      })
      console.log(this.restaurant.r_Dishes);
      //this.restaurantService.addRestaurant(this.restaurant)
      this.restaurantService.addRestaurant(this.restaurant).subscribe(data=>{
        console.log(data);
      })
      alert("Supplier added Succesfully")
      console.log(this.restaurant)
    }
  }

  form_array_dishes(): FormArray {
    return this.dishForm.get("form_array_dishes") as FormArray
  }

  public removeOrClearDish(i: number){
    const form_array_dishes = this.dishForm.get('form_array_dishes') as FormArray
    if (form_array_dishes.length > 1) {
      form_array_dishes.removeAt(i)
    }
    else {
      form_array_dishes.reset()
    }
  }

  public addDishFormGroup(){
    const form_array_dishes = this.dishForm.get('form_array_dishes') as FormArray
    form_array_dishes.push(this.createDishFormGroup())
  }

}
