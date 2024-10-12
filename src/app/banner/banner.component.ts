import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { CardService } from '../card.service';
import { Card } from '../models/card';
import { DishService } from '../dish.service';
import { OrderService } from '../order.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  //template:"<b>This is the banner template i.e View</b>",
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  card: Card = new Card(0, 0, [], 0);
  // id:number
  // user_id:number
  // productarr:Product[]
  // total:number
  role:any=localStorage.getItem("role");
  user_id:number=0;
  new_order:Order=new Order(0,0,"",[],[],0,0,"");
  count:number[]=[];
  // id:number
  //   restaurant_id:number
  //   order_date:string
  //   dishes_names:string[]
  //   num_of_dishes:number[]
  //   user_id:number
  //   total_order:number
  //   payment_mode:string


 
  // flag:boolean=false;
  show_admin:boolean=false;
 
  constructor(private userservice:UserService,private cartservice:CardService,private orderservice:OrderService){
    this.user_id=parseInt(localStorage.getItem("id")||'0');
   console.log(this.role);
   if(this.role=="admin"){
    this.show_admin=true;
  }
  

  }
  clearLocalStorage() {
    localStorage.clear();
    // additional logic or actions after clearing localStorage
  }

  onSubmit(value: string): void{
    console.log('you submitted value: ',value);
  }
  clear_cart(){
    this.cartservice.getcartbyid(this.user_id).subscribe(data=>{
      this.card=data;
      this.card.productarr=[];
      this.card.total=0;
      this.cartservice.updateCart(this.card).subscribe(()=>{
        // alert("cart updated");
      })
    });
  }
  do_checkout(){
    // alert("trying to add order");
 this.cartservice.getcartbyid(this.user_id).subscribe(data=>{
        this.card=data;
        this.orderservice.getOrders().subscribe(data=>{
          this.new_order.id=data.length+1;
          this.new_order.order_date=new Date().toString();
          this.new_order.restaurant_id=this.card.productarr[0].r_id;
          this.new_order.dishes_names=this.card.productarr.map((item)=>item.p_name);
          this.new_order.num_of_dishes=this.card.productarr.map((item)=>item.p_quantity);
          this.new_order.user_id=this.card.user_id;
          this.new_order.total_order=this.card.total;
          this.new_order.payment_mode="cash";
          this.orderservice.addOrder(this.new_order).subscribe(()=>{
            // alert("order added");
            // console.log(this.new_order);
          }); 
    });
        // console.log(this.card);
      });
this.card.user_id=this.user_id;
      this.cartservice.updateCart(this.card).subscribe(()=>{
        // alert("cart updated");
      })

  }


}




// do_checkout(){
  
//   this.cartservice.getcartbyid(this.user_id).subscribe(data=>{
//             this.card=data;
//             for(let i=0;i<this.card.productarr.length;i++){
//               for(let j=0;i<this.count.length;j++){
//                 if(this.count[j]==this.card.productarr[i].r_id){
//                  continue;
//                 }
//                 else{
//                   this.count.push(this.card.productarr[i].r_id);
//                 }
//               }
//             }
//             for(let k=0;k<this.count.length;k++){
//               this.orderservice.getOrders().subscribe(data=>{
//                 this.new_order.id=data.length+1+k;
//               });
//               this.new_order.order_date=new Date().toString();
//               this.new_order.restaurant_id=this.count[k];
//               for(let i=0;i<this.card.productarr.length;i++){
//                 if(this.card.productarr[i].r_id==this.count[k]){
//                   this.new_order.dishes_names.push(this.card.productarr[i].p_name);
//                   this.new_order.num_of_dishes.push(this.card.productarr[i].p_quantity);
//                 }
//               }
  //     this.orderservice.getOrders().subscribe(data=>{
        //       this.new_order.id=data.length+1; 
        // });
        //     this.new_order.order_date=new Date().toString();
        //     this.new_order.restaurant_id=this.card.productarr[0].r_id;
        //     this.new_order.dishes_names=this.card.productarr.map((item)=>item.p_name);
        //     this.new_order.num_of_dishes=this.card.productarr.map((item)=>item.p_quantity);
        //     this.new_order.user_id=this.card.user_id;
        //     this.new_order.total_order=this.card.total;
        //     this.new_order.payment_mode="cash";
        //     this.orderservice.addOrder(this.new_order).subscribe(()=>{
        //       console.log("order added");
        //     });
    
        //     // console.log(this.card);
        //   });
