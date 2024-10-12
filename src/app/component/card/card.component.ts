import { Component } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/card.service';
import { RestaurantService } from 'src/app/restaurant.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/models/product';
import { DishService } from 'src/app/dish.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  cart_Id: string | null = '';
  arrproducts: Product[] = [];
  cart: Card = new Card(0, 0, [], 0);
  cart_id: number = 0;
  product_name: string = '';

  constructor(private activatedRoute: ActivatedRoute, private dishService: DishService, private cartservice: CardService) {
    this.cart_id = localStorage.getItem("id") ? parseInt(localStorage.getItem("id")!) : 0;
    this.cartservice.getcartbyid(this.cart_id).subscribe(data => {
      this.cart = data;
      this.arrproducts = this.cart.productarr;
      console.log(this.cart);
    });
  }

  handleplus(p: string) {
    this.product_name = p;
    for (let i = 0; i < this.arrproducts.length; i++) {
      if (this.arrproducts[i].p_name == this.product_name) {
        this.arrproducts[i].p_quantity += 1;
        this.arrproducts[i].p_total_cost += Number(this.arrproducts[i].p_price);
        this.cart.total += Number(this.arrproducts[i].p_price);
        this.cartservice.updateCart(this.cart).subscribe(data => {
          this.cart = data;
          console.log(this.cart);
        });
        break;
      }
    }
  }
  
  handleminus(p: string) {
    this.product_name = p;
    for (let i = 0; i < this.arrproducts.length; i++) {
      if (this.arrproducts[i].p_name == this.product_name) {
        if (this.arrproducts[i].p_quantity > 1) {
          this.arrproducts[i].p_quantity -= 1;
          this.arrproducts[i].p_total_cost -= this.arrproducts[i].p_price;
          this.cart.total -= this.arrproducts[i].p_price;
          this.cartservice.updateCart(this.cart).subscribe(data => {
            this.cart = data;
            console.log(this.cart);
          });
        }
        break;
      }
    }
  }
}



// export class CardComponent {
//   cart_Id:string|null='';
//   arrproducts: Product[] = [];
//   cart: Card = new Card(0, 0, [], 0);
//   cart_id:number=localStorage.getItem("id")?parseInt(localStorage.getItem("id")!):0;
//   product_name:string='';
//   constructor(private activatedRoute: ActivatedRoute,private dishService:DishService,cartservice:CardService){
//    cartservice.getcartbyid(this.cart_id).subscribe(data=>{
//       this.cart=data;
//       this.arrproducts=this.cart.productarr;
//       console.log(this.cart);
//     });
 
// }
// handleplus(p:string) {
//   this.product_name=p;
//   for(let i=0;i<this.arrproducts.length;i++){
//    if(this.arrproducts[i].p_name==this.product_name){
//      this.arrproducts[i].p_quantity+=1;
//      this.arrproducts[i].p_total_cost+=this.arrproducts[i].p_price;
//      this.cart.total+=this.arrproducts[i].p_price;
//      this.cartservice.updateCart(this.cart).subscribe(data=>{
//        this.cart=data;
//        console.log(this.cart);
//      });
//      break;
//    }

//  }


//  // this.activatedRoute.params.subscribe((params: Params) =>{
//  //   let id=params['id'];
//  //   console.log(id);
  
//  //   this.dishService.getDishById(id).subscribe(data=>{
//  //     this.prod.d_id=data.id;
     
//  //     console.log(data);
//  //     // this.prod.p_img_path=data.d_image_path;
    
//  //   })
//  //   //this.dishes=this.rest.r_Dishes;
//  //   // console.log(this.dishes);
//  // })

// }
// }