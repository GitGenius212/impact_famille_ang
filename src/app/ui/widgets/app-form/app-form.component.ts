import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppStateService } from '../../../services/appState/app-state.service';
import { UserService } from '../../../services/users/user.service';
import { ModalFormService } from '../../../services/modal/modal-form.service';

@Component({
  selector: 'app-form',
  templateUrl: './app-form.component.html',
  styleUrl: './app-form.component.css'
})
export class AppFormComponent implements OnInit{
  userFormInitiate! : FormGroup;
  constructor(public appState: AppStateService, private service: UserService, 
    private fb : FormBuilder, public modalService : ModalFormService){}

  ngOnInit(): void {
    this.modalService.checklistTypeState = [ 
      {
        label: 'Client',
        value: 'CLIENT',
        checked: false
      },
      {
        label: 'Directeur',
        value: 'DIRECTEUR',
        checked: false,
      },
      {
        label: 'Bénévole',
        value: 'BENEVOLE',
        checked: false
      }
    ];
  }


    get prix() {
      return this.modalService.userForm.get('prix') as FormControl;
    }
  
    

  

    soustrairePrix() {
      //Déclaration de variables
      let prix = this.prix.value;
      //Traitements-------------
      if(prix == 0 || prix < 0) {
        this.prix.setValue(0);
      } else {
        this.prix.setValue(prix - 1);
      }

      
      
      
      }
      additionnerPrix() {
        //Déclaration de variables
        let prix = this.prix.value;
        //Traitements------------
        this.prix.setValue(prix + 1);
        
      }

}
