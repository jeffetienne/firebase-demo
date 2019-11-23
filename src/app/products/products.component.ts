import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/products';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).valueChanges().subscribe(cart => this.cart = cart);
  }
  products: Product[]=[];
  products$;
  categories$;
  category: string;
  filteredProducts: Product[];
  cart: any;
  subscription: Subscription

  constructor(route: ActivatedRoute, 
    productService: ProductService,
    private shoppingCartService: ShoppingCartService) { 

    this.products$ = productService.getAll()
    .snapshotChanges().map(snapshots => {
      return snapshots.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    //this.categories$ = categoryService.getCategories();

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.products$.subscribe(products => {
        this.products = products;
        this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products;
      });
    });

    
    
  }

}
