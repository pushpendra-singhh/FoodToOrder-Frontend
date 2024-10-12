import { Component, Input } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {
  p: number = 1;
  count: number = 5;
  restaurant:Restaurant[]=[];
  //@Input() restaurant:any[]=[]
  restaurants:Restaurant[]=[];
  getRestaurants_by_category_id(category_id:number){
    for(let i=0;i<this.restaurants.length;i++){
      if(this.restaurants[i].category_id==category_id){
        this.restaurant.push(this.restaurants[i])
      }
    }
  }

  constructor(private restaurantService:RestaurantService,private router:Router){
    //this.restaurants=this.restaurantService.getRestaurants()
    this.restaurantService.getRestaurants().subscribe(data=>{
      this.restaurants=data
      // alert("hello ji");
      // alert("hello");
    this.getRestaurants_by_category_id(3);
    // console.log(this.restaurants);
    console.log(this.restaurant);
    })
    // alert("hello");
    // this.getRestaurants_by_category_id(3);
    // // console.log(this.restaurants);
    // console.log(this.restaurant);
  }
 
  
  // gray_restaurant(rest_id:number){
  //   this.restaurantService.get_id(rest_id).subscribe(data=>{
  //     this.restaurants=data
  //   })
  // }

  viewMenu(rest_id:number){
    this.router.navigate(['menu/'+rest_id]);
  }
  

}
