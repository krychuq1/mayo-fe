import { Routes } from '@angular/router';
import {EmailConfirmation} from './email-confirmation/email-confirmation';
import {WelcomeScreen} from './welcome-screen/welcome-screen';
import {AdventCalendar} from './advent-calendar/advent-calendar';
import { authGuard } from './services/auth.guard';
import {ActivateUser} from './activate-user/activate-user';
import {RenderMode} from '@angular/ssr';
import {VideoPlayerComponent} from './video-player/video-player';
import {videoGuard} from './services/video-guard';

export const routes: Routes = [
  { path: '', component: AdventCalendar, pathMatch: 'full', canActivate: [authGuard],
    runGuardsAndResolvers: 'always'},

  {path: 'welcome', component: WelcomeScreen},
  {path: 'email-confirmation', component: EmailConfirmation},
  {path: 'activate-user/:token', component: ActivateUser},
  {
    path: 'master-class',
    component: VideoPlayerComponent,
    canActivate: [videoGuard],
  },
];
