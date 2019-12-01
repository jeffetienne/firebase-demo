import { Product } from './products';
import { Items } from './items';

export class ShoppingCart{
    
    items: Items[]=[];

    constructor(public itemsMap: { [productId: string]: Items }){
      for(let productId in itemsMap)
        this.items.push(itemsMap[productId]);
    }

    getQuantity(product: Product){
      let item: Items = this.itemsMap[product.key];
      return item ? item.quantity : 0;
    }

    get totalItemsCount(){
        let count = 0;
      for(let productId in this.items){
        count += this.items[productId].quantity;
      }
      return count;
    }
}