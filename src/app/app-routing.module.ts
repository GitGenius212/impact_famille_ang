import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';
import { ProductsComponent } from './ui/products/products.component';
import { BoitesComponent } from './ui/boites/boites.component';
import { UserComponent } from './ui/user/user.component';
import { NewProductComponent } from './ui/new-product/new-product.component';
import { NewBoxeComponent } from './ui/new-boxe/new-boxe.component';
import { LoginComponent } from './ui/login/login.component';
import { EditUsersComponent } from './ui/edit-users/edit-users.component';
import { BenevoleTemplateComponent } from './ui/benevole-template/benevole-template.component';
import { authentificationGuard } from './guards/authentification.guard';
import { NotAuthorizedComponent } from './ui/notAuthorized/not-authorized/not-authorized.component';
import { authorizationGuard } from './guards/authorization.guard';
import { EditProductsComponent } from './ui/edit-products/edit-products.component';
import { DetailsProductsComponent } from './ui/details-products/details-products.component';
import { ChatGptComponent } from './ui/chat-gpt/chat-gpt.component';

const routes: Routes = [
  
  {path:"login", component:LoginComponent},

  {path:"benevole", component:BenevoleTemplateComponent, canActivate : [authentificationGuard], 
  children: [
    {path:"home", component:HomeComponent},
    {path:"", redirectTo:'home', pathMatch:'full'}, 
    {path:"users", component:UserComponent, canActivate:[authorizationGuard], data : {roles: ["BENEVOLE","DIRECTEUR"]}},
    {path:"products", component:ProductsComponent},
    {path:"boxes", component:BoitesComponent},
    {path:"edit_product", component:EditProductsComponent},
    {path:"detail_product/:id", component:DetailsProductsComponent},
    {path:"new_product", component:NewProductComponent, canActivate:[authorizationGuard], data : {roles: ["DIRECTEUR"]}},
    {path:"new_boxe", component:NewBoxeComponent, canActivate:[authorizationGuard], data : {roles: ["DIRECTEUR"]}},
    {path:"edit-users/:id", component:EditUsersComponent, canActivate:[authorizationGuard], data : {roles: ["BENEVOLE","DIRECTEUR"]}},
    {path:"chat-gpt", component: ChatGptComponent, canActivate : [authentificationGuard]},
  ]},
  {path:"", redirectTo:'login', pathMatch:'full'},
  {path:"not-authorized", component: NotAuthorizedComponent, canActivate : [authentificationGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
