import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppStateService } from '../appState/app-state.service';
import { catchError, throwError } from 'rxjs';



export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  //Déclaration de variables-----------------------------------------
  const appStateService = inject(AppStateService);
  const userToken = appStateService.authState.token; 
  //https://platform.openai.com/api-keys
  const token_gpt = "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";

  let modifiedReq : any;
  //Traitements------------------------------------------------------
  if(req.url == "https://api.openai.com/v1/chat/completions") {
    //console.log("modifiedReq : " + req.url);
    modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token_gpt}`),
    });

  } else {
    modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
    });
  }
  

  return next(modifiedReq).pipe(catchError(handleError));
};


const handleError : any = (error: HttpErrorResponse) => {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.log( "Connexion à la BD échoué");
  } else if(error.status === 400){
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    /* console.log(
      `Backend returned code ${error.status}, body was: `, error.error); */
  }
  // Return an observable with a user-facing error message.
  return throwError(() => new Error(error.error));
}


