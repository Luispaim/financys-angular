import { Category } from './../shared/category.model';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryservice: CategoryService) { }

  ngOnInit() {
    this.categoryservice.getAll().subscribe(
      categories => this.categories = categories,
      erro => alert('erro ao carregar a lista')
    );
  }

  deleteCategory(category) {
    const mustDelete = confirm('Deseja realmente excluir este item?');
    if (mustDelete) {
      this.categoryservice.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element !== category),
        () => alert('Erro ao tentar excluir')
      );
    }
  }
}
