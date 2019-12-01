import { ShoppingCart } from './shopping-cart';
export interface Shipping{
    key: string,
    name: string,
    address: string,
    line2: string,
    city: string,
    shoppingCart: ShoppingCart
}