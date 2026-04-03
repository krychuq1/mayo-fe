import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss', '../welcome-screen/welcome-screen.scss']
})
export class Dashboard {

}
