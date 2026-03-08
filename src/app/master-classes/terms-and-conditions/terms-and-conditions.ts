import { Component } from '@angular/core';
import { McHeader } from '../mc-header/mc-header';
import { McFooter } from '../footer/footer';

@Component({
  selector: 'app-mc-terms-and-conditions',
  imports: [McHeader, McFooter],
  templateUrl: './terms-and-conditions.html',
  styleUrl: './terms-and-conditions.scss'
})
export class TermsAndConditions {}
