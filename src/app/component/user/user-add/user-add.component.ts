import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {

  firstFormGroup = this._formBuilder.group({
    // firstCtrl: ['', Validators.required],
    first_name: ['', Validators.required],
    middle_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    dob: ['', Validators.required],
    mobile: ['', Validators.required],
    role: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
    house_No: ['', Validators.required],
    street: ['', Validators.required],
    area: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    pincode: ['', Validators.required]
  });
  
  isLinear = false;
  arrUsers: User[]=[];
  user: User;


  constructor(private _formBuilder: FormBuilder,private userService:UserService){
    //this.arrUsers=this.userService.getUsers();
    this.userService.getUser().subscribe(data=>{
      this.arrUsers=data
    })

    this.user=new User(0,'','','','','','','',new Address(0,'','','','','',''),'');
  }


  saveFirstStepData(formdata:FormGroup){
    let tempId = 0;
    let maxId = 0;
    this.arrUsers.forEach(s => {
      if (maxId < s.id) {
        maxId = s.id;
      }
    })
    tempId = maxId
    tempId++
    console.log(formdata)
    this.user.id=tempId;
    this.user.first_name=formdata.value['first_name'];
    this.user.middle_name=formdata.value['middle_name'];
    this.user.last_name=formdata.value['last_name'];
    this.user.email=formdata.value['email'];
    this.user.password=formdata.value['password'];
    this.user.dob=formdata.value['dob'];
    this.user.mobile=formdata.value['mobile'];
    this.user.role=formdata.value['role'];
    console.log(this.user.first_name);
  }

  saveSecondStepData(formdata: FormGroup){
    let tempId = 0;
    let maxId = 0;
    this.arrUsers.forEach(s => {
      if(maxId < s.address.id){
        maxId = s.address.id;
      }
    })
    tempId = maxId;
    tempId++;
    console.log(formdata);
    this.user.address.id=tempId;
    this.user.address.house_No=formdata.value['house_No'];
    this.user.address.street=formdata.value['street'];
    this.user.address.area=formdata.value['area'];
    this.user.address.city=formdata.value['city'];
    this.user.address.country=formdata.value['country'];
    this.user.address.pincode=formdata.value['pincode'];
    console.log(this.user.address);
    //this.userService.addUser(this.user);
    this.userService.addUser(this.user).subscribe(data=>{
      console.log(data);
    })

  }

}
