import {Component, OnInit} from '@angular/core';
import {CalendarDay} from './calendar-day/calendar-day';
import {AuthService} from '../services/auth.service';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-advent-calendar',
  templateUrl: './advent-calendar.html',
  imports: [
    CalendarDay,
    CarouselModule,
    NgClass,
  ],
  styleUrl: './advent-calendar.scss'
})
export class AdventCalendar implements OnInit {
  constructor(public authService: AuthService,) {
  }

  ngOnInit(): void {
    console.log('here');
    console.log((navigator.userAgent || navigator.vendor || '').toLowerCase());
  }


  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    dotsEach: 4,
    margin: 10,
    navSpeed: 700,
    stagePadding: 30,
    animateOut: 'fadeOut',
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false,
  }

  days = Array.from({ length: 24 }, (_, i) => i + 1);
}
