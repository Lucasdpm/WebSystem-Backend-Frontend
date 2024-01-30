import { Component } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../product';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent{

  productList: Product[] = []
  displayedColumns: string[] = ['name', 'price', 'weight', 'description', 'storage'];
  error: any;

  constructor(private productService: ProductService) { 
    this.productService.getAllProducts().subscribe((data) => {
      this.productList = data
    }, (err) => {
      this.error = `Erro ao deletar usuario. StackTrace: ${err}`
    })
  }
}
