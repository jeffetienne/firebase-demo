import { Items } from './items';

export class ShoppingCart{
    
    constructor(public items: Items[]){}
    get totalItemsCount(){
        let count = 0;
      for(let productId in this.items){
        count += this.items[productId].quantity;
      }
      return count;
    }
}