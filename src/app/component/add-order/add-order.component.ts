import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {
  firstFormGroup = this._formBuilder.group({
    // firstCtrl: ['', Validators.required],
    restaurant_id: ['', Validators.required],
    order_date: ['', Validators.required],
    dishes_names: ['', Validators.required],
    num_of_dishes: ['', Validators.required],
    user_id: ['', Validators.required],
    total_order: ['', Validators.required],
    payment_mode: ['', Validators.required]
  });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required]
  // });
  
  isLinear = false;
  count=0;
  arrOrders:Order[]=[]
  //public secondFormGroup: FormGroup;
  order: Order;
  countSecondFormSubmit = 0;
  dishes: Order[]=[];

  constructor(private _formBuilder: FormBuilder,private orderService:OrderService){
    //this.arrUsers=this.userService.getUsers();
    this.orderService.getOrders().subscribe(data=>{
      this.arrOrders=data
    })

    // this.secondFormGroup = this._formBuilder.group({
    //   form_array_addresses: this._formBuilder.array([this.createDishFormGroup()])
    // })
 

    this.order=new Order(0,0,'',[],[],0,0,'');
  }

  // private createDishFormGroup(): FormGroup {
  //   this.count++;
  //   return new FormGroup({
  //     'id': new FormControl('', Validators.required),
  //     'house_No': new FormControl('', Validators.required),
  //     'street': new FormControl('', Validators.required),
  //     'area': new FormControl('', Validators.required),
  //     'city': new FormControl('', Validators.required),
  //     'country': new FormControl('', Validators.required),
  //     'pincode': new FormControl('', Validators.required)
  //   })
  // }


  saveFirstStepData(formdata:FormGroup){
    let tempId = 0;
    let maxId = 0;
    this.arrOrders.forEach(s => {
      if (maxId < s.id) {
        maxId = s.id;
      }
    })
    tempId = maxId
    tempId++
    console.log(formdata)
    this.order.id=tempId;
    this.order.restaurant_id=formdata.value['restaurant_id'];
    this.order.order_date=formdata.value['order_date'];
    this.order.dishes_names=formdata.value['dishes_ids'];
    this.order.num_of_dishes=formdata.value['num_of_dishes'];
    this.order.user_id=formdata.value['user_id'];
    this.order.total_order=formdata.value['total_order'];
    // this.user.email=formdata.value['email'];
    // this.user.password=formdata.value['password'];
    // this.user.dob=formdata.value['dob'];
    // this.user.mobile=formdata.value['mobile'];
    // this.user.role=formdata.value['role'];
    console.log(this.order.id);
    this.orderService.addOrder(this.order).subscribe(data=>{
      console.log(data);
    })
  }

  // saveSecondStepData(formdata: FormGroup){
  //   let tempId = 0;
  //   let maxId = 0;
  //   this.arrUsers.forEach(s => {
  //     if(maxId < s.address.id){
  //       maxId = s.address.id;
  //     }
  //   })
  //   tempId = maxId;
  //   tempId++;
  //   console.log(formdata);
  //   this.user.address.id=tempId;
  //   this.user.address.house_No=formdata.value['house_No'];
  //   this.user.address.street=formdata.value['street'];
  //   this.user.address.area=formdata.value['area'];
  //   this.user.address.city=formdata.value['city'];
  //   this.user.address.country=formdata.value['country'];
  //   this.user.address.pincode=formdata.value['pincode'];
  //   console.log(this.user.address);
  //   //this.userService.addUser(this.user);
  //   this.userService.addUser(this.user).subscribe(data=>{
  //     console.log(data);
  //   })

  // }
}
