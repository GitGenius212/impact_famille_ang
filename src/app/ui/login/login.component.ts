import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../services/appState/app-state.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
    loginForm! : FormGroup;
    errorMessage! : string;
    constructor(public appStateService : AppStateService, private fb : FormBuilder, private router : Router, 
      private authService : AuthService
    ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
        username: this.fb.control(""), 
        password : this.fb.control("")
    });

  }

  handleLogin() {
    //Déclaration de variables------------------
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;

    //Traitements-------------------------------
    this.authService.login(username, password)
    .then(resp => {
      this.router.navigateByUrl('/benevole');
    })
    .catch(err => {
      if(err == "Incorrect password") 
        this.errorMessage = "Le nom d'utilisateur ou le mot de passe est incorrect";
      else if(err == "Email and password are required") {
        this.errorMessage = "L'email et le mot de passe sont requis";
      } else if(err == "Cannot find user") {
        this.errorMessage = "Impossible de trouver l'utilisateur";
      } else 
      this.errorMessage = err;
      console.log("erreur après la connexion: " + JSON.stringify(err));
    })
    

    
  }
}
