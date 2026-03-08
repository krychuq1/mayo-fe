import { Component } from '@angular/core';
import { McHeader } from '../mc-header/mc-header';
import { McFooter } from '../footer/footer';

@Component({
  selector: 'app-mc-contact',
  imports: [McHeader, McFooter],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {}
