import { Routes } from '@angular/router';
import {EmailConfirmation} from './email-confirmation/email-confirmation';
import {WelcomeScreen} from './welcome-screen/welcome-screen';
import {AdventCalendar} from './advent-calendar/advent-calendar';
import { authGuard } from './services/auth.guard';
import {ActivateUser} from './activate-user/activate-user';

export const routes: Routes = [
  { path: '', component: AdventCalendar, pathMatch: 'full', canMatch: [authGuard] },
  {path: 'welcome', component: WelcomeScreen},
  {path: 'email-confirmation', component: EmailConfirmation},
  {path: 'activate-user/:token', component: ActivateUser},
];
