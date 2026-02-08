import {Component, signal, OnInit, OnDestroy, PLATFORM_ID, inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {CheckoutService} from '../../services/checkout.service';
import {McFooter} from '../footer/footer';

@Component({
  selector: 'app-landing-page',
  imports: [McFooter],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private checkoutService = inject(CheckoutService);
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private readonly deadline = new Date('2026-02-18T00:00:00+01:00');

  days = signal(0);
  hours = signal(0);
  minutes = signal(0);
  daysLabel = signal('dni');
  hoursLabel = signal('godz.');
  loading = signal(false);
  error = signal('');

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.tick();
      this.intervalId = setInterval(() => this.tick(), 60_000);
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private tick() {
    const diff = this.deadline.getTime() - Date.now();
    if (diff <= 0) {
      this.days.set(0);
      this.hours.set(0);
      this.minutes.set(0);
      this.daysLabel.set('dni');
      this.hoursLabel.set('godz.');
      return;
    }
    const totalMinutes = Math.floor(diff / 60_000);
    const d = Math.floor(totalMinutes / 1440);
    const remainingMinutes = totalMinutes % 1440;
    const h = Math.floor(remainingMinutes / 60);
    const m = remainingMinutes % 60;
    this.days.set(d);
    this.hours.set(h);
    this.minutes.set(m);
    this.daysLabel.set(d === 1 ? 'dzień' : 'dni');
    this.hoursLabel.set('godz.');
  }

  buy() {
    this.loading.set(true);
    this.error.set('');
    this.checkoutService.createCheckoutSession().subscribe({
      next: (res) => {
        window.location.href = res.url;
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Nie udało się utworzyć sesji płatności. Spróbuj ponownie.');
      }
    });
  }
}
