import { Injectable, OnInit } from '@angular/core';
import { Restaurant } from './models/restaurant';
import { Address } from './models/address';
import { Dish } from './models/dish';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Rowner } from './models/rowner';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService  {
  user:string|null='';
  user_id:any=0;
  
  baseUrl:string="http://localhost:3000"
  arrRestaurants:Restaurant[]=[]

  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private httpClient:HttpClient) { 
    this.user=localStorage.getItem("role");
      this.user_id=localStorage.getItem("id");
      // alert("restaurant-owner");
      console.log(this.user);
  }
  

  getRestaurants(): Observable<Restaurant[]>{
    return this.httpClient.get<Restaurant[]>(this.baseUrl + '/restaurants')
    .pipe(catchError(this.httpError));
  }

  getRestaurantOwner(): Observable<Rowner>{
    return this.httpClient.get<Rowner>(this.baseUrl + '/r_owners/'+this.user_id)
    .pipe(catchError(this.httpError));
  }

  getRestaurantById(rest_id:number): Observable<Restaurant>{
    return this.httpClient.get<Restaurant>(this.baseUrl + '/restaurants/' + rest_id)
    .pipe(catchError(this.httpError));
  }
  // getRestaurants_by_category_id(category_id:number): Observable<Restaurant[]>{
  //   return this.httpClient.get<Restaurant[]>(this.baseUrl + '/restaurants?category_id=' + category_id)
  //   .pipe(catchError(this.httpError));
  // }
  
  addRestaurant(u:Restaurant): Observable<Restaurant>{
    return this.httpClient.post<Restaurant>(this.baseUrl+'/restaurants',JSON.stringify(u),this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  updateRestaurant(u:Restaurant): Observable<Restaurant>{
    return this.httpClient.put<Restaurant>(this.baseUrl+'/restaurants/'+u.id,JSON.stringify(u),this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }


  // addedRestaurants:Restaurant[]=[
  //   new Restaurant(1001,"KFC","assets/images/restaurant1.png",[new Address(576,"107","11th Main Road","Kormagala","Bangalore","India","560011")]),
  //   new Restaurant(1002,"Mac Donal","assets/images/restaurant2.png",[new Address(577,"108","11th Main Road","Kormagala","Bangalore","India","560011")]),
  //   new Restaurant(1002,"IronHills","assets/images/restaurant3.png",[new Address(578,"109","11th Main Road","Kormagala","Bangalore","India","560011")])
  // ]

  // updateRestaurants:Restaurant[]=[
  //   new Restaurant(1001,"KFC","assets/images/restaurant1.png",[new Address(576,"107","11th Main Road","Kormagala","Bangalore","India","560011")]),
  //   new Restaurant(1002,"Mac Donal","assets/images/restaurant2.png",[new Address(577,"108","11th Main Road","Kormagala","Bangalore","India","560011")]),
  //   new Restaurant(1002,"IronHills","assets/images/restaurant3.png",[new Address(578,"109","11th Main Road","Kormagala","Bangalore","India","560011")]),
  //   new Restaurant(1001,"KFC","assets/images/restaurant1.png",[new Address(576,"107","11th Main Road","Kormagala","Bangalore","India","560011")]),
  //   new Restaurant(1002,"Mac Donal","assets/images/restaurant2.png",[new Address(577,"108","11th Main Road","Kormagala","Bangalore","India","560011")])
  // ]
  
  //constructor() { }

  // getRestaurants(){
  //   return this.arrRestaurants
  // }

  // getAddedRestaurants(){
  //   return this.addedRestaurants
  // }

  // addRestaurant(u:Restaurant){
  //   this.arrRestaurants.push(u);
  //   console.log(u);
  //   console.log(this.arrRestaurants);
  // }

  // getRestaurantById(rest_id:number){
  //   let restaurant=new Restaurant(0,'','',[],[]);
  //   for(let i=0;i<this.arrRestaurants.length;i++){
  //     if(this.arrRestaurants[i].id==rest_id){
  //       restaurant=this.arrRestaurants[i];
  //       return restaurant
  //     }
  //   }
  //   return restaurant
  // }
  

  // getUpdateRestaurants(){
  //   return this.updateRestaurants
  // }

  httpError(error:HttpErrorResponse){
    let msg='';
    if(error.error instanceof ErrorEvent){
      msg=error.error.message;
    }
    else{
      msg=`Error Code:${error.status}\nMessafe:${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }

}
