import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppStateService } from '../appState/app-state.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, private appState : AppStateService) { }

  async login(username : string, _password : string) : Promise<any>{
    const body = {email : username, password : _password}
    let token = undefined;
    let roles = undefined;
    let username_registered = undefined;
    try {
      
      let data :any = await firstValueFrom(this.http.post("http://localhost:8090/login", 
        body
      ));
      //console.log("data login: " + JSON.stringify(data.user.email) );
      token = data.accessToken;
      roles = data.user.types;
      username_registered = data.user.nom + " " + data.user.prenom;
      /** Exemple d'un token: 
       * {"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNtaXRoQGltcGFjdC5jb20iLCJpYXQiOjE3MTQwNjIxNDYsImV4cCI6MTcxNDA2NTc0Niwic3ViIjoiMSJ9.Eg90R_j80pl1XWmQ3qPRPmEWgX5Dp7ik0M2Q4eUFoBk",
       * "user":{"email":"smith@impact.com","nom":"Smith","prenom":"John","situation_familiale":"MARIE","telephone":"(438)-123-4567","region":"Paris","types":["BENEVOLE"],"description":"Répond aux besoins des clients en gérant les utilisateurs et les produits.","payee":true,"chariot":[],"prix":10,"id":1}}
       */

      this.appState.setAuthSate({
         isAuthentificated : true, 
         token, 
         roles, 
         username : username_registered
      });
      return Promise.resolve(true);
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  }

}
