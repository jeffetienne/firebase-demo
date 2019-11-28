import { Product } from './products';

export class Items{
    product: Product;
    quantity: number;
    
    get totalPrice(){ return this.product.price * this.quantity; }
}