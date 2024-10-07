import { SituationFamiliale } from "./enum/SituationFamiliale.enum";
import { TypeUser } from "./enum/typeUser.enum";
import { Product } from "./product.model";

export  class User {
     id: number; 
     nom:string; 
     prenom:string; 
     situation_familiale: SituationFamiliale;
     telephone : string; 
     email : string;
     password : string;
     region : string;
     types: TypeUser[];
     description : string;
     payee : boolean;
     chariot : Product[]; 
     prix: number

     constructor(p_id: number, p_name: string, p_prenom: string, 
        p_sf : SituationFamiliale, p_tel : string, p_region : string, 
        p_types: TypeUser[], p_description: string, p_payee: boolean, 
        p_chariot : Product[], p_prix: number, p_email : string, p_password: string) {
            this.id = p_id;
            this.nom = p_name;
            this.prenom = p_prenom;
            this.situation_familiale = p_sf;
            this.telephone = p_tel;
            this.region = p_region;
            this.types = p_types;
            this.description = p_description;
            this.payee = p_payee;
            this.chariot = p_chariot;
            this.prix = p_prix;
            this.email = p_email;
            this.password = p_password;

        } 


  }