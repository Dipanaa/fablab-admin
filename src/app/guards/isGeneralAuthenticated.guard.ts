import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { firstValueFrom } from 'rxjs';

export const isGeneralAuthenticatedGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log("autenticado",authService.Autenticacion());

  const isAuthenticated = await firstValueFrom (authService.checkStatus());

  console.log(isAuthenticated,"Estado de autenticacion");

  if (isAuthenticated){
    return true;
  }

  return false;
}
