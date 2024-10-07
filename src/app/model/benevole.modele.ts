
import { SituationFamiliale } from "./enum/SituationFamiliale.enum";
import { TypeUser } from "./enum/typeUser.enum";
import { Product } from "./product.model";
import { User } from "./user.model";

export class Benevole extends User {
    debut: Date;
    fin: Date;

    constructor( p_id: number, p_name: string, p_prenom: string, 
        p_sf : SituationFamiliale, p_tel : string, p_region : string, 
        p_type: TypeUser[], p_description: string, p_payee: boolean, 
        p_chariot : Product[], p_prix: number, p_debut: Date, p_fin: Date, p_email:string, p_password : string) {
        super(p_id, p_name, p_prenom, p_sf, p_tel, p_region, p_type, p_description, 
            p_payee, p_chariot, p_prix, p_email, p_password);

        this.debut = p_debut;
        this.fin = p_fin;
    }
}
