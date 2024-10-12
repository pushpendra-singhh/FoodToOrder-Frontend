export class Rowner{
    id:number;
    restaurant_ids:number[];
    constructor(id:number,restaurant_ids:number[]){
        this.id=id;
        this.restaurant_ids=restaurant_ids;
    }
}
// "id": 7,
//     "restaurant_ids": [
//       4,
//       5,
//       6
//     ]