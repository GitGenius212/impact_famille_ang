import { Component, OnInit } from '@angular/core';
import { ModalFormService } from '../../../services/modal/modal-form.service';
import { UserService } from '../../../services/users/user.service';
import { AppStateService } from '../../../services/appState/app-state.service';
import { User } from '../../../model/user.model';
import { FunctionsglobalAppService } from '../../../services/functionsglobal/functionsglobal-app.service';
import { FormArray } from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit{
  constructor(public modalService : ModalFormService, 
    private userService: UserService, public appState: AppStateService, 
    private functions: FunctionsglobalAppService) {}
  ngOnInit(): void {
    this.modalService.types.clear();
  }


  

  saveUser() {
    console.log("Save user");
    let user = this.modalService.userForm.value;
    this.userService.addUser(user)
    .subscribe({
      next : resp => {
        let listUsers = this.appState.userState.users.slice();
        //console.log(listUsers);
        listUsers.push(user);
        //alert(JSON.stringify(resp));
        this.appState.setUserSate({users : listUsers});
        this.functions.getUsers({});
      }, 
      error : err => {
        console.log(err);
      }
    });
  }

  
  


}
