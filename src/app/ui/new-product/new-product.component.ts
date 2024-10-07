import { Component, OnInit} from '@angular/core';
import $ from 'jquery';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
  ngOnInit(): void {
    this.test();
  }
  
  test = () => {
    $('.dropdown-item').on("click", function() {
      let text = $(this).find('.text').html(); // Récupère le texte du premier span
      let badge = $(this).find('.badge').html(); // Récupère le contenu du badge
  
      // Réassemble le contenu avec la structure souhaitée
      console.log("text : " + text + "  badge : " + badge)
      if(text == undefined && badge == undefined) {
        text = "Choisir la boîte";
        badge = "";
      }
      console.log("text : " + text + "  badge : " + badge)
      const html = `<span class="d-flex justify-content-between"><span>${text}</span><span class="badge bg-primary me-4">${badge}</span></span>`;
  
      $('#dropdownMenuButton1').html(html); // Remplace le contenu du bouton dropdown
    });
  }
  
  



  
  }


  

  


