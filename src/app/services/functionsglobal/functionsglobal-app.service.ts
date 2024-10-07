import { Injectable } from '@angular/core';
import { AppStateService } from '../appState/app-state.service';
import { User } from '../../model/user.model';
import { UserService } from '../users/user.service';
import { SituationFamiliale } from '../../model/enum/SituationFamiliale.enum';
import { TypeUser } from '../../model/enum/typeUser.enum';
import { BoitesService } from '../boites/boites.service';
import { Boite } from '../../model/boite.modele';
import { Product } from '../../model/product.model';
import { ProductService } from '../products/product.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionsglobalAppService {

  constructor(public appState : AppStateService, public userService : UserService, 
     private boiteService : BoitesService, 
    private productService: ProductService) { }


  stringsToTypeUsers(typeStrings: any[]): TypeUser[] {
    return typeStrings.map((typeString: any) => {
        switch (typeString) {
            case "BENEVOLE":
                return TypeUser.BENEVOLE;
            case "CLIENT":
                return TypeUser.CLIENT;
            case "DIRECTEUR":
                return TypeUser.DIRECTEUR;
            default:
                throw new Error(`Unknown user type: ${typeString}`);
        }
    });
  }

  stringsToTypeSituationFamiliale(typeString: any): SituationFamiliale {
        switch (typeString) {
            case "MARIE":
                return SituationFamiliale.MARIE;
            case "CELIBATAIRE":
                return SituationFamiliale.CELIBATAIRE;
            case "EN_FAMILLE":
                return SituationFamiliale.EN_FAMILLE;
            default:
                throw new Error(`Unknown user situation familiale: ${typeString}`);
        }
  }

  getUsers({
                keyword=this.appState.userState.keyword,
                page=this.appState.userState.currentPage,
                size=this.appState.userState.pagesSize}) {
    this.userService.getUsers(keyword, page, size).subscribe({
      next : (users: any) => {
        let listUser= users.body as User[];
        let totalUsers : number = parseInt(users.headers.get('X-Total-Count')!);
        let totalPages = Math.floor(totalUsers / this.appState.userState.pagesSize);
        if(totalUsers % this.appState.userState.pagesSize) {
          ++totalPages
        }
        console.log(`Total pages: ${totalUsers}`);
        this.appState.setUserSate({
          totalPages, 
          totalUsers, 
          currentPage: page, 
          keyword
          
        });
        
        listUser.map((p) => {
          
          p.types = this.stringsToTypeUsers(p.types);
          

          p.situation_familiale = this.stringsToTypeSituationFamiliale(p.situation_familiale);
          
          
        });
        this.appState.setUserSate({
          users: listUser
        });

      }
    });
  }

  getBoites({
    keyword=this.appState.boitesState.keyword,
    page=this.appState.boitesState.currentPage,
    size=this.appState.boitesState.pagesSizeBoites}){
    this.boiteService.getBoites(keyword, page, size).subscribe({
      next: (resp: any) => {
        //Déclaration de variables------------------------
        let boites = resp.body as Boite[];
        //Traitements-------------------------------------
        
       
        //console.log(boites);
        this.appState.setBoiteSate({
            boites
        });
      }, 
      error : (err: any) => {
        console.log(err)
      }
    });
  }

  
  getProductsForBoxes() {
    this.productService.getProductsWithoutSize().subscribe({
      next: (resp: any) => {
        let produits = resp.body as Product[];
        //console.log("resp:-----------" + resp.body);
        this.appState.setProductSate({
          products : produits
        });

        this.appState.setBoiteSate({
          products : produits
        });
      }, 
      error: (err) => {
        
      }
    });
  }

  getProducts(
    {keyword=this.appState.productState.keyword,
    page=this.appState.productState.currentPage,
    size=this.appState.productState.pagesSizeProducts}) {
    this.productService.getProducts(keyword, page, size).subscribe({
      next: (resp: any) => {
        let produits = resp.body as Product[];
        //------------------------------------
        let totalProducts : number = parseInt(resp.headers.get('X-Total-Count')!);
        console.log(totalProducts);
        let totalPages = Math.floor(totalProducts / this.appState.productState.pagesSizeProducts);
        if(totalProducts % this.appState.productState.pagesSizeProducts) {
          ++totalPages
        }
        //console.log(`Total pages: ${totalUsers}`);
        this.appState.setProductSate({
          totalPages, 
          totalProducts, 
          currentPage: page, 
          keyword
          
        });
        //------------------------------------
        //console.log("resp:-----------" + resp.body);
        this.appState.setProductSate({
          products : produits
        });
      }, 
      error: (err) => {
        
      }
    });
  }



  
}
