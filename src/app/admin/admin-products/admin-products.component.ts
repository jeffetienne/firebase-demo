import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/products';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[]=[];
  itemCount: number;
  products$;

  constructor(private productService: ProductService) { 
    this.products$ = productService.getAll()
    .snapshotChanges().map(snapshots => {
      return snapshots.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.subscription = this.products$
    .subscribe(products => {
      this.products = products
      
      this.initializeTable(products);
    });
    //.snapshotChanges().map(snapshots => {
      //return snapshots.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    //});
  }

  initializeTable(products: Product[]){
    this.tableResource = new DataTableResource(products);
      this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
      this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params){
    if (!this.tableResource) return;
    
    this.tableResource.query(params)
      .then(items => this.items = items);
    this.initializeTable(params);
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  filter(query: string){
    let filteredProducts = (query) ? 
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;

    this.reloadItems(filteredProducts);
  }
}
