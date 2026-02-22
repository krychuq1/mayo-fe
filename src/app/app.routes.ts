import { Routes } from '@angular/router';
import {WelcomeScreen} from './welcome-screen/welcome-screen';

export const routes: Routes = [
  // { path: '', component: AdventCalendar, pathMatch: 'full', canActivate: [authGuard],
  //   runGuardsAndResolvers: 'always'},
  {path: '', loadChildren: () => import('./master-classes/master-classes-module').then(m => m.MasterClassesModule) },
  // {path: 'welcome', component: WelcomeScreen},
  // {path: 'email-confirmation', component: EmailConfirmation},
  // {path: 'activate-user/:token', component: ActivateUser},
];
