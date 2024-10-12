// import { Component } from '@angular/core';
// import { ActivatedRoute, Params } from '@angular/router';
// import { count } from 'rxjs';
// import { CardService } from 'src/app/card.service';
// import { DishService } from 'src/app/dish.service';
// import { Card } from 'src/app/models/card';
// import { Dish } from 'src/app/models/dish';
// import { Product } from 'src/app/models/product';
// import { Restaurant } from 'src/app/models/restaurant';
// import { RestaurantService } from 'src/app/restaurant.service';

// @Component({
//   selector: 'app-menu',
//   templateUrl: './menu.component.html',
//   styleUrls: ['./menu.component.css']
// })
// export class MenuComponent {
//   dishes:Dish[]=[]
//   card:Card=new Card(0,0,[],0);
//   cards:Card[]=[];
//   product:Product=new Product('','',0,0,0,0,0,0);
//   user_id:number=0;
//   flag:boolean=false;
//   // r_id:number=0;
 
//   rest:Restaurant=new Restaurant(0,'','',[],[],0);
//   constructor(private activatedRoute: ActivatedRoute,private restaurantService:RestaurantService,private cardService:CardService){
//     this.user_id=parseInt(localStorage.getItem("id")||"0");
//     console.log(this.user_id);
//     this.activatedRoute.params.subscribe((params: Params) =>{
//       let id=params['id'];
//       console.log(id);
//       cardService.r_id=id;
     
//       this.restaurantService.getRestaurantById(id).subscribe(data=>{
//         this.rest=data;
//         this.dishes=this.rest.r_Dishes;
//       })
//       //this.dishes=this.rest.r_Dishes;
//       console.log(this.dishes);
//     })
//   }
//   addToCart(data:any){
//     console.log("method called");
    
//   this.cardService.getCart().subscribe(data1=>{
//      this.cards=data1;
//      console.log(data1);
//      ////////////////////////////
//      this.cards.forEach(element => {
//       console.log(element.user_id,this.user_id);
//       if (element.user_id==this.user_id){
//         this.flag=true;
//         this.product.p_img_path="enter image path";
//         this.product.p_name=data.d_Name;
//         this.product.p_price=data.d_Cost;
//         this.product.p_quantity=1;
//         this.product.p_total_cost=data.d_Cost*this.product.p_quantity;
//         this.product.r_id=data.id;
//         this.product.d_id=0;
//         this.product.u_id=this.user_id;
//         this.card.productarr.push(this.product);
//         this.card.total=this.card.total+this.product.p_total_cost;
//         console.log(this.card);
//         this.cardService.updateCart(this.card).subscribe(data=>{
//           this.card=data;
//         });
//         // break;
//       }
//     });
//     if(this.flag==false){
      
//         let val=localStorage.getItem("id");
//         this.card.id=val?parseInt(val):0;
//         this.card.user_id=val?parseInt(val):0;
//         this.product.p_img_path="enter image path";
//         this.product.p_name=data.d_Name;
//         this.product.p_price=data.d_Cost;
//         this.product.p_quantity=1;
//         this.product.p_total_cost=data.d_Cost*this.product.p_quantity;
//         this.product.r_id=data.id;
//         this.product.d_id=0;
//         this.product.u_id=val?parseInt(val):0;
//         this.card.productarr.push(this.product);
//         this.card.total=this.card.total+this.product.p_total_cost;
//         // console.log(this.card);
    
//         this.cardService.addCart(this.card).subscribe(data=>{
//           this.card=data;
//           console.log(this.card);
//         });
    
//   }
//      ////////////////////////////

//      });
    
  
//   // id:number
//   //   user_id:number
//   //   productarr:Product[]
//   //   total:number
//   //product
//   // id: number;
//   // p_img_path: string;
//   // p_name: string;
//   // p_price: number;
//   // p_quantity: number;
//   // p_total_cost: number;
//   // r_id: number;
//   // d_id: number;
//   // u_id: number;
// }
// }
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CardService } from 'src/app/card.service';
import { DishService } from 'src/app/dish.service';
import { Card } from 'src/app/models/card';
import { Dish } from 'src/app/models/dish';
import { Product } from 'src/app/models/product';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  dishes: Dish[] = [];
  na_dishes:boolean[]=[true,true];
  card: Card = new Card(0, 0, [], 0);
  cards: Card[] = [];
  product: Product = new Product('', '', 0, 0, 0, 0, 0, 0);
  user_id: number = 0;
  user_role: string = '';
  flag: boolean = false;
  rest: Restaurant = new Restaurant(0, '', '', [], [], 0);

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    private cardService: CardService
  ) {
    this.user_role = localStorage.getItem('role') || '';
    this.user_id = parseInt(localStorage.getItem('id') || '0');
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      cardService.r_id = id;
      this.restaurantService.getRestaurantById(id).subscribe((data) => {
        this.rest = data;
        this.dishes = this.rest.r_Dishes;
      });
    });
  }

  addToCart(data: any) {
    //alert("adding to cart");
    // console.log('method called');
    this.cardService.getCart().subscribe((data1) => {
      this.cards = data1;
      //////
      //alert("got cart");
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].user_id == this.user_id) {
          //alert("user with cart found");
          this.flag = true;
          this.product.p_img_path = 'enter image path';
          this.product.p_name = data.d_Name;
          this.product.p_price = data.d_Cost;
          this.product.p_quantity = 1;
          this.product.p_total_cost = data.d_Cost * this.product.p_quantity;
          this.product.r_id = data.id;
          this.product.d_id = 0;
          this.product.u_id = this.user_id;
          //alert("checking if product already exists in cart");
          if(this.cards[i].productarr.length>0 && this.cards[i].productarr.every((item)=>item.p_name==this.product.p_name)
          ){break;};//if product already exists in cart
        //alert("product not found in cart");
          this.cards[i].productarr.push(this.product);
          //alert("product added to productarr");
          this.cards[i].total = this.cards[i].total + this.product.p_total_cost;
         if (this.user_role == "user") {this.cardService.updateCart(this.cards[i]).subscribe((data) => {
            this.card = data;
          });}
          //alert("products updated");
          break;
        }
      }
      
///////////
      if (this.flag == false) {
        let val = localStorage.getItem('id');
        this.card.id = val ? parseInt(val) : 0;
        this.card.user_id = val ? parseInt(val) : 0;
        this.product.p_img_path = 'enter image path';
        this.product.p_name = data.d_Name;
        this.product.p_price = data.d_Cost;
        this.product.p_quantity = 1;
        this.product.p_total_cost = data.d_Cost * this.product.p_quantity;
        this.product.r_id = data.id;
        this.product.d_id = 0;
        this.product.u_id = val ? parseInt(val) : 0;
        this.card.productarr.push(this.product);
        this.card.total = this.card.total + this.product.p_total_cost;

        if(this.user_role=='user'){
          this.cardService.addCart(this.card).subscribe((data) => {
          this.card = data;
        });}
        // //alert("product added");
      }
    });
  }
}
