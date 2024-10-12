export class Order{
    id:number
    restaurant_id:number
    order_date:string
    dishes_names:string[]
    num_of_dishes:number[]
    user_id:number
    total_order:number
    payment_mode:string
    constructor(id:number,restaurant_id:number,order_date:string,dishes_names:string[],num_of_dishes:number[],user_id:number,total_order:number,payment_mode:string){
        this.id=id
        this.restaurant_id=restaurant_id
        this.order_date=order_date
        this.dishes_names=dishes_names
        this.num_of_dishes=num_of_dishes
        this.user_id=user_id
        this.total_order=total_order
        this.payment_mode=payment_mode
    }
}
// import { Product } from "./product";



// export class Order{
//     products:Product[];
//     user_id:number;
//     total:number;
//     time:string;
//     date:string;
//     constructor(products:Product[],user_id:number,total:number,time:string,date:string){
//         this.products=products;
//         this.user_id=user_id;
//         this.total=total;
//         this.time=time;
//         this.date=date;
//     }
// }