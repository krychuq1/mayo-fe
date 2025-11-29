import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import {firstValueFrom} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const cookieService = inject(CookieService);

  const token = getToken(cookieService);
  try{
    const res = await firstValueFrom(authService.validateToken(token));
    authService.setUserWithCalendarData(res);
    return true;
  } catch (e) {
    return router.createUrlTree(['/welcome']);

  }
};

function getToken(cookieService: CookieService): string  {
    const token = cookieService.get('mayo_auth_token');
    return token;
}

