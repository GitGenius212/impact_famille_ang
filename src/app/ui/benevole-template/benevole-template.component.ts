import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../services/appState/app-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-benevole-template',
  templateUrl: './benevole-template.component.html',
  styleUrl: './benevole-template.component.css'
})
export class BenevoleTemplateComponent implements OnInit{
  ngOnInit(): void {
    console.log("login: " + this.appStateService.authState.isAuthentificated);
  }

  actions: Array<any> = [
    {title:"Products", route:"/benevole/products", icon:"box2"},
    {title:"Boxes", route:"/benevole/boxes", icon:"box2"},
    {title:"Users", route:"/benevole/users", icon:"box2"},
    {title:"ChatGPT", route:"/benevole/chat-gpt", icon:"box2"},
    
  ];

  constructor(public appStateService : AppStateService, private router : Router){}


  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.router.navigateByUrl('/login');
  }
}
