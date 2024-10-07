import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../services/appState/app-state.service';
import { BoitesService } from '../../services/boites/boites.service';
import { Boite } from '../../model/boite.modele';
import { FunctionsglobalAppService } from '../../services/functionsglobal/functionsglobal-app.service';
import { Product } from '../../model/product.model';
import { ProductService } from '../../services/products/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boites',
  templateUrl: './boites.component.html',
  styleUrl: './boites.component.css'
})
export class BoitesComponent implements OnInit{

  
  constructor(public appStateBoites : AppStateService, private service : BoitesService, 
    private functions: FunctionsglobalAppService, private productService : ProductService, 
    private router : Router){}

    ngOnInit() {
     this.functions.getBoites({});
     this.functions.getProductsForBoxes();
  }

  filtreProductsByBoxes(id: number) : Product[]{
    //Déclaration de variables------------------
    let products : Product[]= [];
    let productsStateBoites : Product[] = this.appStateBoites.boitesState.products;
    //Traitements-------------------------------
    
    productsStateBoites.forEach((p) => {
        if(p.boite_id == id) {
          products.push(p);
        }
      });
      
    
    return products;
  }

  handleDetailProduct(product: Product) {
    this.router.navigateByUrl(`benevole/detail_product/${product.id}`);
    }


}
