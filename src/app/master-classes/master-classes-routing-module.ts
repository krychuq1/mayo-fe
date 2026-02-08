import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPage} from './landing-page/landing-page';
import {Success} from './success/success';

const routes: Routes = [
  { path: '', component: LandingPage},
  { path: 'success', component: Success},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class MasterClassesRoutingModule { }
