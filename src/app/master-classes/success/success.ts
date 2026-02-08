import {Component, OnInit, signal, PLATFORM_ID, inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {McFooter} from '../footer/footer';
import {CheckoutService} from '../../services/checkout.service';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-success',
  imports: [McFooter],
  templateUrl: './success.html',
  styleUrl: './success.scss'
})
export class Success implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  private checkoutService = inject(CheckoutService);

  email = signal('');
  loading = signal(false);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const sessionId = params['session_id'];
      if (sessionId) {
        this.loading.set(true);
        this.checkoutService.getSessionEmail(sessionId).subscribe({
          next: (res) => {
            this.email.set(res.email);
            this.loading.set(false);
          },
          error: () => {
            this.loading.set(false);
          },
        });
      }
    });
    if (isPlatformBrowser(this.platformId)) {
      this.fireConfetti();
    }
  }

  private fireConfetti() {
    const colors = ['#F77710', '#063DBF', '#FFD700', '#FF6B6B', '#14AE5C'];

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.3, y: 0.4 },
      colors,
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.7, y: 0.4 },
      colors,
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 90,
        origin: { x: 0.5, y: 0.3 },
        colors,
      });
    }, 300);
  }
}
