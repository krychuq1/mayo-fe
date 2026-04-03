import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPage} from './landing-page/landing-page';
import {Success} from './success/success';
import {VideoPlayer} from './video-player/video-player';
import {Expired} from './video-player/expired/expired';
import {mcVideoGuard} from '../services/mc-video.guard';
import {PrivacyPolicy} from './privacy-policy/privacy-policy';
import {TermsAndConditions} from './terms-and-conditions/terms-and-conditions';
import {Contact} from './contact/contact';
import {Unsubscribe} from './unsubscribe/unsubscribe';

const routes: Routes = [
  { path: '', component: LandingPage},
  { path: 'success', component: Success},
  { path: 'unsubscribe/:email', component: Unsubscribe},
  { path: 'privacy-policy', component: PrivacyPolicy},
  { path: 'terms-and-conditions', component: TermsAndConditions},
  { path: 'contact', component: Contact},
  { path: 'video/expired', component: Expired },
  { path: 'video/:token', component: VideoPlayer, canActivate: [mcVideoGuard] },

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class MasterClassesRoutingModule { }
