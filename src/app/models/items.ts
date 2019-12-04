import { Product } from './products';

export class Items{
    title: string;
    price: number;
    category: string;
    imageUrl: string;
    product: Product;
    quantity: number;
    
    get totalPrice(){ return this.product.price * this.quantity; }
}