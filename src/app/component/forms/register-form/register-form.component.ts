import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';
import { MustMatch } from '../must_watch';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  currentDate = new Date(); // Get the current date
  selectedDate: string='';
  isValid = true;

  onDateChange() {
    // Convert the selectedDate to a Date object
    const selectedDateObj = new Date(this.selectedDate);

    // Check if the selected date is after the current date
    if (selectedDateObj > this.currentDate) {
      this.isValid = false;
    } else {
      this.isValid = true;
    }
  }

  user:User=new User(0,"","","","","","","",new Address(0,"","","","","",""),"user");
  usersArr:User[]=[];
  submitted = false;
  myForm: FormGroup;
  firstName: AbstractControl;
  middleName: AbstractControl;
  lastName: AbstractControl;
  email: AbstractControl;
  pwd: AbstractControl;
  confirm_password: AbstractControl;
  house_No: AbstractControl;
  street: AbstractControl;
  area: AbstractControl;
  city: AbstractControl;
  state: AbstractControl;
  country: AbstractControl;
  zip: AbstractControl;
  mobile: AbstractControl;
  dob: AbstractControl;
  
//   dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
//     // const date = new Date(control.value);
//     const currentDate = new Date();
//  const day=control.value.slice(8,10)
//   const month=control.value.slice(5,7)
//   const year=control.value.slice(0,4)
//     const currentYear = currentDate.getFullYear();
//     const currentMonth = currentDate.getMonth();
//     const currentDay = currentDate.getDate();
//     if(currentDay<day && currentMonth<month && currentYear<year){
//       return { 'dateValidator': true };
//     }
//   }
  


  constructor(fb: FormBuilder,private UserService:UserService) {
    
    //this.usersArr=this.UserService.getUsers()
    this.UserService.getUser().subscribe(data=>{
      this.usersArr=data
    })
    this.myForm = fb.group({
      'firstName': ['',Validators.required],
      'middleName': ['',Validators.required],
      'lastName': ['',Validators.required],
      'email': ['',Validators.required],
      'pwd': ['',Validators.required],
      'confirm_password': ['',Validators.required],
      'house_No': ['',Validators.required],
      'street': ['',Validators.required],
      'area': ['',Validators.required],
      'city': ['',Validators.required],
      'state': ['',Validators.required],
      'country': ['',Validators.required],
      'zip': ['',Validators.required],
      'mobile': ['',Validators.required],
      'dob': ['',Validators.required]
    },
    {
      validator: MustMatch('pwd', 'confirm_password')
    }
    );
    this.firstName=this.myForm.controls['firstName'];
    this.middleName=this.myForm.controls['middleName'];
    this.lastName=this.myForm.controls['lastName'];
    this.email=this.myForm.controls['email'];
    this.pwd=this.myForm.controls['pwd'];
    this.confirm_password=this.myForm.controls['confirm-password'];
    this.house_No=this.myForm.controls['house_No'];
    this.street=this.myForm.controls['street'];
    this.area=this.myForm.controls['area'];
    this.city=this.myForm.controls['city'];
    this.state=this.myForm.controls['state'];
    this.country=this.myForm.controls['country'];
    this.zip=this.myForm.controls['zip'];
    this.mobile=this.myForm.controls['mobile'];
    this.dob=this.myForm.controls['dob'];
    
  }
  ngOnInit(){
    //this.usersArr=this.UserService.getUsers()
    this.UserService.getUser().subscribe(data=>{
      this.usersArr=data
    })
  }
  get f(){return this.myForm.controls}

  onSubmit(value: any): void {
    this.submitted=true;
    // if(this.myForm.invalid){
    //   return;
    // }
    console.log(this.myForm.controls['firstName'])
    console.log('you submitted value: ', value.firstName,value.middleName,value.lastName,value.email,value.pwd);
    var tempId=0;
    var maxId=0;
    this.usersArr.forEach(u =>{
      if(maxId < u.id){
        maxId = u.id;
      }
    })
    tempId = maxId;
    tempId = tempId + 1;
    this.user=new User(0,"","","","","","","",new Address(0,"","","","","",""),"user");
    let fN=this.myForm.value.firstName
    let mN=this.myForm.value.middleName
    let lN=this.myForm.value.lastName
    let email=this.myForm.value.email
    let pwd=this.myForm.value.pwd
    let confirm_pwd=this.myForm.value.confirm_password
    let house_No=this.myForm.value.house_No
    let street=this.myForm.value.street
    let area=this.myForm.value.area
    let cty=this.myForm.value.city
    let state=this.myForm.value.state
    let country=this.myForm.value.country
    let zip=this.myForm.value.zip
    let dob=this.myForm.value.dob
    let mobile=this.myForm.value.mobile
    let role="user"

    this.user.first_name=fN;
    this.user.middle_name=mN;
    this.user.last_name=lN;
    this.user.email=email;
    this.user.password=pwd;
    this.user.dob=dob;
    this.user.mobile=mobile;
    this.user.role=role;
    this.user.address.house_No=house_No
    this.user.address.street=street
    this.user.address.area=area
    this.user.address.city=cty
    this.user.address.country=country
    this.user.address.pincode=zip
    if(fN!=null && mN!=null && lN!=null && email!=null && pwd!=null && dob!=null && mobile!=null && role!=null && house_No!=null && street!=null && area!=null && cty!=null && country!=null && zip!=null){
      this.user=new User(tempId,fN,mN,lN,email,pwd,dob,mobile,new Address(0,house_No,street,area,cty,country,zip),role);
      console.log(this.user);
      this.UserService.addUser(this.user).subscribe(data=>{
        console.log(data);
      })
    }
  }
  // passwordMatchValidator(control: AbstractControl): {[key: string]: boolean} | null {
  //   const password = control.get('pwd');
  //   const confirmPassword = control.get('confirm_password');
  //   if (password.value !== confirmPassword.value) {
  //     return {passwordsMatch: true};
  //   }
  //   return null;
  // }
}


