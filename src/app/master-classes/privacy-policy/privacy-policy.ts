import { Component } from '@angular/core';
import { McHeader } from '../mc-header/mc-header';
import { McFooter } from '../footer/footer';

@Component({
  selector: 'app-mc-privacy-policy',
  imports: [McHeader, McFooter],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss'
})
export class PrivacyPolicy {}
