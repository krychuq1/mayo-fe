import {inject, PLATFORM_ID} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import {firstValueFrom} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {isPlatformBrowser} from '@angular/common';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const platformId = inject(PLATFORM_ID);

  if(!isPlatformBrowser(platformId)) {
    return true;
  }

  const token = getToken(cookieService);
  try{
    const res = await firstValueFrom(authService.validateToken(token));
    authService.setUserWithCalendarData(res);
    const allDaysOpen = await firstValueFrom(authService.checkIfUserOpenAllDays(token));

    if(allDaysOpen) {
      return router.createUrlTree(['/master-class']);
    } else {
      return true;
    }
  } catch (e) {
    return router.createUrlTree(['/welcome']);

  }
};

function getToken(cookieService: CookieService): string  {
  const token = cookieService.get('mayo_auth_token');
  return token;
}

