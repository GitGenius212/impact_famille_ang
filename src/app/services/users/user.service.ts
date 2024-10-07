import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../model/product.model';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host: string = "http://localhost:8090";

  constructor(private http:HttpClient) { }


  getUsers(keyword : string, page: number=1, size:number=6){
    //Déclaration de variables---------------------------------------------

    //Sortie---------------------------------------------
      return this.http.get(`${this.host}/users?nom_like=${keyword}&_page=${page}&_limit=${size}`,
     { observe: 'response' , transferCache: {
      includeHeaders: ['X-Total-Count']}});
   
  }

  getUserById(user_id: number): Observable<User>{
    //Déclaration de variables---------------------------------------------
    

    //Sortie---------------------------------------------
    return this.http.get<User>(`${this.host}/users/${user_id}`);
 
}

  addUser(user : User) : Observable<User>{
    return this.http.post<User>(`${this.host}/users`,
     user);
  }

  deleteUser(user : User) : Observable<User>{
    return this.http.delete<User>(`${this.host}/users/${user.id}`);
  }

  updateUser(user : User) : Observable<User> {
    
    return this.http.put<User>(`${this.host}/users/${user.id}`, user);
  }

}
