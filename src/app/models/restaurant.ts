import { Address } from "./address"
import { Dish } from "./dish"

export class Restaurant{
    id:number
    r_Name:string
    r_Img_Path:string
    r_Addresses:Address[]
    r_Dishes:Dish[]
  category_id:number
//category_id which maps to id in category model .this model has two fields id and name so based on the category id write a method in resturant service to return an arrya of restruarnats in that category.
    constructor(i:number,r_N:string,r_I:string,r_Add:Address[],r_D:Dish[],category_id:number){
        this.id=i
        this.r_Name=r_N
        this.r_Img_Path=r_I
        this.r_Addresses=r_Add
        this.r_Dishes=r_D
        this.category_id=category_id
    }
}