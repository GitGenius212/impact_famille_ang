import { TypeProduit } from "./enum/typeProduit.enum";

export interface Product {
    id: number, 
    photo:string, 
    nom:string, 
    type:TypeProduit, 
    description : string, 
    quantite: number, 
    boite_id : number
  }