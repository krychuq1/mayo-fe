import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import {NgClass} from '@angular/common';
import {CalendarService} from '../../services/calendar.service';
import {VintedItem} from '../../services/types/vinted-item.model';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-calendar-day',
  imports: [
    NgClass
  ], // Note: CommonModule is usually needed here unless you use @if in template
  templateUrl: './calendar-day.html',
  styleUrl: './calendar-day.scss',
})
export class CalendarDay implements OnInit, OnDestroy {
  @Input() dayNumber!: number;
  @Input() isOpen!: boolean;
  @Input() isWhite!: boolean;
  @Input() isSecret!: boolean;
  @Input() isMissed!: boolean;
  vintedItems: VintedItem[] = [];
  countdown = signal<string>('');
  hasSauce = signal<boolean>(false);
  get firstItem(): VintedItem | undefined {
    return this.vintedItems[0];
  }

  get hasVintedItem(): boolean {
    return !!this.firstItem;
  }


  get sauceItemUrl(): string {
    const item = this.firstItem;
    console.log('here ', item);

    if (!item || !item.sauceUrls || item.sauceUrls.length === 0) {
      return '';
    }
    return item.sauceUrls[0];
  }

  get firstItemImage(): string {
    const item = this.firstItem;
    if (!item) {
      return '';
    }
    const image = (item.vintedItemUrls && item.vintedItemUrls[0]) || (item.sauceUrls && item.sauceUrls[0]);
    return image || 'logo.svg';
  }

  get backgroundImage(): string {
    if (this.isSecret) {
      return '';
    }
    return `url(advent-calendar/${this.dayNumber}.png)`;
  }

  private timerId: any;

  constructor(private calendarService: CalendarService,
              private authService: AuthService) {}

  ngOnInit(): void {
    // make it custome based on dayNumber form input you will get from 1 to 24 where 1 is December 1st and 24 is December 24th
    const targetDate = new Date(`2025-12-${this.dayNumber.toString().padStart(2, '0')}T08:00:00Z`);

    this.timerId = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        // Calculate total full days
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        if (days >= 1) {
          // Calculate remaining hours using modulo (%) to remove the full days
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

          const dayLabel = days === 1 ? 'dzień' : 'dni';
          const hourLabel = hours === 1 ? 'godz' : 'godz.';

          // Result: "1 day and 10 hours" or "2 days and 1 hour"
          this.countdown.set(`${days} ${dayLabel} i ${hours} ${hourLabel}`);

        } else {
          // Less than 24h: Standard HH:MM:SS
          const hours = Math.floor((difference / (1000 * 60 * 60)));
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);

          const timeString = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
          this.countdown.set(timeString);
        }

      } else {
        this.countdown.set('00:00:00');
        clearInterval(this.timerId);
      }
    }, 1000);
    if(this.dayNumber === 1 ) {
      this.getItemForDay();
    }

  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : String(num);
  }
  private get userAgent(): string {
    if (typeof navigator === 'undefined') {
      return '';
    }
    return (navigator.userAgent || navigator.vendor || '').toLowerCase();
  }

  isInstagramInApp(): boolean {
    return this.userAgent.includes('instagram');
  }

  open(): void {
    this.isOpen = true;
    this.authService.openDay(this.dayNumber).subscribe({
      next: () => {
        console.log('Day opened successfully');
      },
      error: (err) => {
        console.error('Error opening calendar day:', err);
      }
    });
  }

  getItemForDay(): void{
    this.calendarService.openDay(this.dayNumber).subscribe({
      next: (res) => {
        this.vintedItems = res;

      },
      error: (err) => {
        console.error('Error opening calendar day:', err);
      }
    })

  }
}
