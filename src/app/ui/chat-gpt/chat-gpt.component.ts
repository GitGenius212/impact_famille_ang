import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { error } from 'jquery';

@Component({
  selector: 'app-chat-gpt',
  templateUrl: './chat-gpt.component.html',
  styleUrl: './chat-gpt.component.css'
})
export class ChatGptComponent implements AfterViewInit{
  //Déclaration de variables---------------------------
  @ViewChild('messageContainer') messageContainerRef!: ElementRef;
  model="gpt-3.5-turbo";
  message : string = "";
  result : any;
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Who won the world series in 2020?"},
    {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
    {"role": "user", "content": "Where was it played?"}, 
    
  ];


  //Constructeur----------------------------------------
  constructor(private http : HttpClient) { }

  ngAfterViewInit(): void {
    if(this.messageContainerRef) {
      const messageContainer = this.messageContainerRef.nativeElement;

    // Faire défiler vers le bas au chargement de la page
    messageContainer.scrollTop = messageContainer.scrollHeight;

    // Ajouter un événement pour faire défiler vers le bas à chaque ajout de message
    messageContainer.addEventListener('DOMNodeInserted', () => {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    });
    }
  }

  //Traitements--------------------------------------------
  handleAskGPT() {

    if(this.message != "") {
      console.log("Ask GPT is send successfully");
      //Déclaration de variables
      let url : string = "https://api.openai.com/v1/chat/completions";
      
      //Traitements-------------
      this.messages.push(
        {"role": "user", "content": this.message}
      );

      let payload : any = {
        model : this.model, 
        messages : this.messages
      }

      this.http.post(url, payload).subscribe({
        next : (resp) => {
          this.result = resp;
          console.log(this.result.choices);
          this.result.choices.forEach((choice: any) => {
            this.messages.push(
              choice.message);
          });
        }, 
        error: (error) => {
          console.log(error);
        }
      });


    }
    
  }
  
  
    
}
