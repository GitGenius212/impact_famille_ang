import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  caisse : number = 100;
  title = 'Impact Famille';
  productState : any = {
    keyword : "", 
    products : [],
    totalPages : 0, 
    currentPage : 1, 
    pagesSizeProducts : 12, 
    totalProducts: 0    
    
  }

  userState : any = {
    users : [], 
    keyword : "", 
    totalPages : 0, 
    currentPage : 1, 
    pagesSize : 10, 
    totalUsers : 0
  }

  boitesState : any = {
    products : [],
    boites : [], 
    keyword : "", 
    totalBoites : 0, 
    pagesSizeBoites : 10, 
  }

  public authState: any = {
    isAuthentificated : false,
    username : undefined, 
    roles: undefined,
    token : undefined
  }

  constructor() { }

  setProductSate(stateProduct: any) : void {
    this.productState = {...this.productState, ...stateProduct}
  }

  setUserSate(stateUser: any) : void {
    this.userState = {...this.userState, ...stateUser}
  }

  setBoiteSate(stateBoite: any) : void {
    this.boitesState = {...this.boitesState, ...stateBoite}
  }

  setAuthSate(stateAuth: any) : void {
    this.authState = {...this.authState, ...stateAuth}
  }

}
