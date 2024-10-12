// export class Card{
//     id:number
//     user_id:number
//     dish_ids:number[]
//     number_of_each_dish:number[]
//     total:number
//     constructor(i:number,u_id:number,d_ids:number[],num_dishes:number[],tot:number){
//         this.id=i
//         this.user_id=u_id
//         this.dish_ids=d_ids
//         this.number_of_each_dish=num_dishes
//         this.total=tot
//     }
// }

import { Product } from "./product"

export class Card{
    id:number
    user_id:number
    productarr:Product[]
    total:number
    constructor(i:number,u_id:number,prodarr:Product[],tot:number){
        this.id=i
        this.user_id=u_id
        this.productarr=prodarr
        this.total=tot
    }

}

