import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'category-dash',
  templateUrl: './category-dash.component.html',
  styleUrls: ['./category-dash.component.css']
})
export class CategoryDashComponent implements OnInit {

  categories$;
  //category: string;
  @Input('category') category;

  constructor(route: ActivatedRoute,
    categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
    /* route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
    }); */
  }

  ngOnInit() {
  }

}
