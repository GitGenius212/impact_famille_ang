import { CanActivateFn, Router } from '@angular/router';
import { AppStateService } from '../services/appState/app-state.service';
import { inject } from '@angular/core';

export const authentificationGuard: CanActivateFn = (route, state) => {
  //Déclaration de variables-------------------------------------------
  const appState = inject(AppStateService);
  const router = inject(Router);

  //Traitements---------------------------------------------------------
  if(appState.authState.isAuthentificated == true) {
      return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }


  return true;
};
