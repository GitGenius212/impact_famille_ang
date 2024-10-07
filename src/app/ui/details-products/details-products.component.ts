import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/products/product.service';
import { Product } from '../../model/product.model';
import { AppStateService } from '../../services/appState/app-state.service';

@Component({
  selector: 'app-details-products',
  templateUrl: './details-products.component.html',
  styleUrl: './details-products.component.css'
})
export class DetailsProductsComponent implements OnInit{
  //Déclaration de variables----------------------------
  product_id! : number;
  product! : Product;
  //Constructeur----------------------------------------
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, 
              public appState : AppStateService
  ){}

  //Traitements-----------------------------------------
  ngOnInit(): void {
    this.product_id = this.activatedRoute.snapshot.params['id'];
    this.productService.getProductById(this.product_id).subscribe({
      next: productFind => {
        this.product = productFind;
        console.log(`product => ${this.product.nom}`);
      }, 
      error: err => {
        console.log(err.message);
      }
    });

  }

}
