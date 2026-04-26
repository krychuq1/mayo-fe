import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {McFooter} from '../footer/footer';

interface Product {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  badge: string;
  badgeType: 'coming-soon' | 'unavailable';
  link?: string;
}

@Component({
  selector: 'app-landing-page-v2',
  imports: [McFooter, RouterLink],
  templateUrl: './landing-page-v2.html',
  styleUrl: './landing-page-v2.scss'
})
export class LandingPageV2 {
  products: Product[] = [
    {
      id: 'oferta-stylizacyjna',
      thumbnail: 'landing-page-v2/offer1.png',
      title: 'Oferta stylizacyjna',
      description: 'TBD',
      badge: 'Coming soon!',
      badgeType: 'coming-soon'
    },
    {
      id: 'masterclass-vinted',
      thumbnail: 'landing-page-v2/offer2.png',
      title: 'Masterclass jak szukać na Vinted',
      description: '1h materiał wideo • 5 modułów\nDodatkowo live z szukania!',
      badge: 'Niedostępne',
      badgeType: 'unavailable',
      link: '/master-class'
    }
  ];

  constructor(private router: Router) {}

  openProduct(product: Product) {
    if (product.link) {
      this.router.navigateByUrl(product.link);
    }
  }
}
