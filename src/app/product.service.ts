import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  create(product) {
    this.db.database.ref('/products').push(product);
  }

  constructor(private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list('/products');
  }

  getProduct(productId){
    return this.db.object('/products/' + productId);
  }

  update(productId, product){
    this.db.object('/products/' + productId).update(product)
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
