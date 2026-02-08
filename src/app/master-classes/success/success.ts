import {Component, OnInit, PLATFORM_ID, inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {McFooter} from '../footer/footer';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-success',
  imports: [McFooter],
  templateUrl: './success.html',
  styleUrl: './success.scss'
})
export class Success implements OnInit {
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
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
