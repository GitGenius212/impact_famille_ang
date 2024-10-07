import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './ui/user/user.component';
import { ProductsComponent } from './ui/products/products.component';
import { BoitesComponent } from './ui/boites/boites.component';
import { HomeComponent } from './ui/home/home.component';
import { LoginComponent } from './ui/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './ui/widgets/modal/modal.component';
import { AppFormComponent } from './ui/widgets/app-form/app-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewProductComponent } from './ui/new-product/new-product.component';
import { NewBoxeComponent } from './ui/new-boxe/new-boxe.component';
import { EditUsersComponent } from './ui/edit-users/edit-users.component';
import { BenevoleTemplateComponent } from './ui/benevole-template/benevole-template.component';
import { appHttpInterceptor } from './services/interceptor/app-http.interceptor';
import { NotAuthorizedComponent } from './ui/notAuthorized/not-authorized/not-authorized.component';
import { EditProductsComponent } from './ui/edit-products/edit-products.component';
import { DetailsProductsComponent } from './ui/details-products/details-products.component';
import { ChatGptComponent } from './ui/chat-gpt/chat-gpt.component';

@NgModule({
  declarations: 
  [
    AppComponent,
    UserComponent,
    ProductsComponent,
    BoitesComponent,
    HomeComponent,
    LoginComponent,
    ModalComponent,
    AppFormComponent,
    NewProductComponent,
    NewBoxeComponent,
    EditUsersComponent,
    BenevoleTemplateComponent,
    NotAuthorizedComponent,
    EditProductsComponent,
    DetailsProductsComponent,
    ChatGptComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, 
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    NgbModule
  ],
  providers: [
    provideHttpClient(withFetch()), 
    provideHttpClient(withInterceptors([appHttpInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
