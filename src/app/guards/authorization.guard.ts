import { CanActivateFn, Router } from '@angular/router';
import { AppStateService } from '../services/appState/app-state.service';
import { inject } from '@angular/core';

export const authorizationGuard: CanActivateFn = (route, state) => {
  //Déclaration de variables-------------------------------------------
  const appState = inject(AppStateService);
  const router = inject(Router);

  //Traitements---------------------------------------------------------
  if(appState.authState.roles.some((role : string)=> route.data['roles'].includes(role))) {
    return true;
  } else {
    router.navigateByUrl('/not-authorized');
    return false;
  }
  
};
