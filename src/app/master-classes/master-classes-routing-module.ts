import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPage} from './landing-page/landing-page';
import {Success} from './success/success';
import {VideoPlayer} from './video-player/video-player';
import {Expired} from './video-player/expired/expired';
import {mcVideoGuard} from '../services/mc-video.guard';

const routes: Routes = [
  { path: '', component: LandingPage},
  { path: 'success', component: Success},
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
