import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../services/appState/app-state.service';
import { ProductService } from '../../services/products/product.service';
import { Product } from '../../model/product.model';
import { FunctionsglobalAppService } from '../../services/functionsglobal/functionsglobal-app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  page = 1;
  constructor(public appState : AppStateService, private productService: ProductService, 
    private functions: FunctionsglobalAppService, private router : Router){}
  
  
  ngOnInit(): void {
    this.functions.getProducts({});
  }

  handleGoToPage(page: number) {
    
    this.functions.getProducts({page: page});
  }

  handleSearch() {
    this.functions.getProducts({page: 1});
    }

    handleDeleteProduct(product: Product) {
      //Déclaration de variable
  
      //Traitements------------
      if(confirm("êtes-vous sûr?"))
      this.productService.deleteProduct(product)
      .subscribe({
        next : () => {
          //this.getPtoducts({});
          let products = this.appState.productState.products.filter((p:any) => p.id != product.id);
          let currentPage = this.appState.productState.currentPage;
          if(products.length == 0) {
              --currentPage
              this.appState.setProductSate({currentPage});
              if(currentPage == 0) {
                currentPage = 1;
                this.appState.setProductSate({currentPage}); 
              }
              this.functions.getProducts({});
          } else {
            let totalProducts = this.appState.productState.totalProducts - 1;
            this.appState.setProductSate({
              totalProducts, 
              products
            }); 
          }
         
        }, 
        error : (err: any) => {
          console.log(err);
        }
      });
    }

    handleDetailProduct(product: Product) {
      this.router.navigateByUrl(`benevole/detail_product/${product.id}`);
      }

  


}
