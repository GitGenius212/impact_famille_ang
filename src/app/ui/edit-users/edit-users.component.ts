import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalFormService } from '../../services/modal/modal-form.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/users/user.service';
import { User } from '../../model/user.model';
import { TypeUser } from '../../model/enum/typeUser.enum';
import { AppStateService } from '../../services/appState/app-state.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrl: './edit-users.component.css'
})
export class EditUsersComponent implements OnInit{
  user_id!: number;
  userFormGroup! : FormGroup;

  constructor(private activatedRoute: ActivatedRoute, public modalService : ModalFormService, 
              private router : Router, 
              private userService: UserService, public fb : FormBuilder, private appStateService: AppStateService
  ) {
    this.userFormGroup = this.fb.group({ 
      nom: this.fb.control('', [Validators.required]),

      prenom:this.fb.control('', [Validators.required]),

      situation_familiale: this.fb.control('', [Validators.required]),
      
      telephone : this.fb.control('', 
      [Validators.pattern("[\+]?[(]?[51438]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}"),Validators.required]),
      
      region : this.fb.control(''),
      email : this.fb.control('', [ Validators.pattern('/[a-z0-9._%+-]+@impact+\.com$/gm')]), 
      password : this.fb.control('', [Validators.required]), 

      types: this.fb.array(this.modalService.checklistTypeState.filter((c: any) => c.checked)
      .map((c: any) => c.value),
         [Validators.minLength(1), Validators.required]),

      description : this.fb.control(''),
      
      payee : this.fb.control('', ),
      chariot : this.fb.array([]), 
      prix: this.fb.control(0)
     });
  }

  ngOnInit(): void {
    this.user_id = this.activatedRoute.snapshot.params['id'];
    this.userService.getUserById(this.user_id).subscribe({
      next : (user) => {

        //Test-------------------
        //console.log(user);

        this.updateChecklistTypeState(user);

        //Initiate form group-----------------------
        this.userFormGroup = this.fb.group({
          id: this.fb.control(user.id), 
          nom: this.fb.control(user.nom, [Validators.required]),

          prenom:this.fb.control(user.prenom, [Validators.required]),

          situation_familiale: this.fb.control(user.situation_familiale, [Validators.required]),
          
          telephone : this.fb.control(user.telephone, 
          [Validators.pattern("[\+]?[(]?[51438]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}"),Validators.required]),
          
          region : this.fb.control(user.region),
          email : this.fb.control(user.email, [ Validators.pattern('[a-z0-9._%+-]+@impact+\.com'), Validators.required]), 
          password : this.fb.control('', [Validators.required, Validators.minLength(6)]), 

          types: this.fb.array(this.modalService.checklistTypeState.filter((c: any) => c.checked)
          .map((c: any) => c.value),
             [Validators.minLength(1), Validators.required]),

          description : this.fb.control(user.description),
          
          payee : this.fb.control(user.payee, ),
          chariot : this.fb.array(user.chariot), 
          prix: this.fb.control(user.prix)
         });
      }, 
      error: (err) => {
        console.log(err)
      }
    });
  }

  get prix() {
    return this.userFormGroup.get('prix') as FormControl;
  }

  get types() {
    return this.userFormGroup.get('types') as FormArray;
  }

  addTypes(value: string) {
    this.types.push(this.fb.control(value));
  }

  
  

  removeType(index: number) {
    this.types.removeAt(index);
  }

  

  onCheckboxChange(event: Event, index: number) {
    const ischecked = (<HTMLInputElement>event.target).checked;
    const type = this.modalService.checklistTypeState[index];
    const isExist = (this.types.controls.findIndex(control => control.value == type.value)) != -1;
    if (ischecked){
      this.addTypes(type.value) 
      

    } else {
      const IndexToRemove = (this.types.controls.findIndex(control => control.value == type.value));
      if(isExist) this.removeType(IndexToRemove);
    
    }
  }

  updateUser() {
    //Déclaration de variables
    let user: User = this.userFormGroup.value;
    let password_json_server_auth : string = this.userFormGroup.value.password;
    //console.log(password_json_server_auth.substring(0, 2));
    if(password_json_server_auth.substring(0, 2) == "$2") {
        console.log("mot de passe haché");
    }

    //Traitements------------
    this.userService.updateUser(user).subscribe({
      next : (utilisateurUpdate) => {
        //alert(JSON.stringify(utilisateurUpdate));
        this.router.navigateByUrl('/benevole/users');

      }, 
      error : (err) => {
        console.log("ERROR IS : " + err.message);
      }
    });

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

    updateChecklistTypeState(user : User) : any[]{
      //console.log("Changement de listCheckUpdate...");
      //Déclaration de variables----------
      let isChecked = false;
      //Traitements-----------------------
      this.modalService.checklistTypeState.forEach((type) => {
        isChecked = user.types.includes(type.value as TypeUser);
        type.checked = isChecked;

      });


      //Sorties---------------------------
      return this.modalService.checklistTypeState;

    }

}
