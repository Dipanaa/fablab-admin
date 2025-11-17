import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { firstValueFrom } from 'rxjs';

export const adminGuardRouteGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);

  const isAuthenticated = await firstValueFrom (authService.checkStatus());

  if(!isAuthenticated){
    return false;
  }
  //Obtencion de rol
  const userRol = authService.userData()?.rolId;

  if(userRol != 1){
    return false;
  }

  return true;
}
