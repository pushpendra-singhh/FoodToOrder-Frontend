export class Product{
    // id: number;
    p_img_path: string;
    p_name: string;
    p_price: number;
    p_quantity: number;
    p_total_cost: number;
    r_id: number;
    d_id: number;
    u_id: number;
   
constructor( p_img_path: string, p_name: string, p_price: number, p_quantity: number, p_cost: number, r_id: number, d_id: number, u_id: number)
{
    // this.id = id;
    this.p_img_path = p_img_path;
    this.p_name = p_name;
    this.p_price = p_price;
    this.p_quantity = p_quantity;
    this.p_total_cost = p_cost;
    this.r_id = r_id;
    this.d_id = d_id;
    this.u_id = u_id;
 
}
}
