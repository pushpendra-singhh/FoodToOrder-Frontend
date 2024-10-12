// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { Restaurant } from 'src/app/models/restaurant';
// import { Rowner } from 'src/app/models/rowner';
// import { RestaurantService } from 'src/app/restaurant.service';

// @Component({
//   selector: 'app-restaurant-view',
//   templateUrl: './restaurant-view.component.html',
//   styleUrls: ['./restaurant-view.component.css']
// })
// export class RestaurantViewComponent {
//   restaurants:Restaurant[]=[]
//   owner_restaurants:Restaurant[]=[]
//   r_owner:Rowner={id:0,restaurant_ids:[]};
//   constructor(private restaurantService:RestaurantService,private router:Router){
//     //this.restaurants=this.restaurantService.getRestaurants()
//     this.restaurantService.getRestaurants().subscribe(data=>{
//       this.restaurants=data
//     })
//     this.restaurantService.getRestaurantOwner().subscribe(data=>{
//       this.r_owner=data
//     })
//   }
//   for(let i=0;i<this.r_owner.restaurant_ids.length;i++){
//     this.restaurantService.getRestaurantById(this.r_owner.restaurant_ids[i]).subscribe(data=>{
//       this.owner_restaurants.push(data)
//     })
//   }
// user:string=this.restaurantService.user;
// user_id:number=this.restaurantService.user_id;
// res_arr:[]=[];

//   viewMenu(rest_id:number){
//     this.router.navigate(['menu/'+rest_id]);
//   }

//   // deleteUser(uid:number){
//   //   this.userService.deleteUser(uid);
//   // }

//   // viewDetails(uid:number){
//   //   //this.userService.viewDetails(uid);
//   //   this.router.navigate(['users/'+uid])
//   // }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { Rowner } from 'src/app/models/rowner';
import { RestaurantService } from 'src/app/restaurant.service';

@Component({
  selector: 'app-restaurant-view',
  templateUrl: './restaurant-view.component.html',
  styleUrls: ['./restaurant-view.component.css']
})
export class RestaurantViewComponent {
  restaurants: Restaurant[] = [];
  owner_restaurants: Restaurant[] = [];
  r_owner: Rowner = { id: 0, restaurant_ids: [] };
  user: string | null = '';
  user_id: number = 0;
  res_arr: any[] = [];
  show: boolean = false;
  showw: boolean = true;

  constructor(private restaurantService: RestaurantService, private router: Router) {
    this.restaurantService.getRestaurants().subscribe(data => {
      this.restaurants = data;
    });

    this.restaurantService.getRestaurantOwner().subscribe(data => {
      this.r_owner = data;
      // alert('restaurant owner');
     

      for (let i = 0; i < this.r_owner.restaurant_ids.length; i++) {
        this.owner_restaurants.push(this.restaurants[this.r_owner.restaurant_ids[i] - 1]);
      }
    });

    this.user = this.restaurantService.user;
    this.user_id = this.restaurantService.user_id;

    if (this.user == "Restaurant_owner") {
      this.show = true;
      this.showw = false;
    }
  }

  viewMenu(rest_id: number) {
    this.router.navigate(['menu', rest_id]);
  }
}


