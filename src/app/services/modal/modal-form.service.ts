import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ModalFormService {
  checklistTypeState = [ 
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



   userForm : FormGroup = this.fb.group({
    nom: this.fb.control('', [Validators.required]),
    prenom:this.fb.control('', [Validators.required]),
    situation_familiale: this.fb.control('', [Validators.required]),
    telephone : this.fb.control('', 
    [Validators.pattern("[(](514|438)[)][-]{1}[0-9]{3}[-]{1}[0-9]{4}"),Validators.required]),
    region : this.fb.control(''),
    types: this.fb.array(this.checklistTypeState.filter(c => c.checked)
    .map(c => c.value),
       [Validators.minLength(1), Validators.required]),
    description : this.fb.control(''),
    payee : this.fb.control(false, ),
    chariot : this.fb.array([]), 
    prix: this.fb.control(10), 
    email : this.fb.control("", [ Validators.pattern('[a-z0-9._%+-]+@impact+\.com'), Validators.required]), 
    password : this.fb.control("", [Validators.minLength(6), Validators.required]), 

   });

   

  constructor(public fb : FormBuilder) { }

  get types() {
    return this.userForm.get('types') as FormArray;
  }

  addTypes(value: string) {
    this.types.push(this.fb.control(value));
  }

  
  

  removeType(index: number) {
    this.types.removeAt(index);
  }

  

  onCheckboxChange(event: Event, index: number) {
    const ischecked = (<HTMLInputElement>event.target).checked;
    const type = this.checklistTypeState[index];
    const isExist = (this.types.controls.findIndex(control => control.value == type.value)) != -1;
    if (ischecked){
      this.addTypes(type.value) 
      

    } else {
      const IndexToRemove = (this.types.controls.findIndex(control => control.value == type.value));
      if(isExist) this.removeType(IndexToRemove);
    
    }
  }


  

  
  

  setuserForm(stateFormUser: any) : void {  
  this.userForm = {...this.userForm, ...stateFormUser}
  }
}
