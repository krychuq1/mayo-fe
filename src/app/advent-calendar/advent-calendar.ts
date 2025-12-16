import {Component, DOCUMENT, Inject, OnInit, Renderer2} from '@angular/core';
import {CalendarDay} from './calendar-day/calendar-day';
import {AuthService} from '../services/auth.service';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';
import {NgClass} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-advent-calendar',
  templateUrl: './advent-calendar.html',
  imports: [
    CalendarDay,
    CarouselModule,
    ReactiveFormsModule,
  ],
  styleUrl: './advent-calendar.scss'
})
export class AdventCalendar implements OnInit {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
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
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
    ) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      repeatEmail: ['', [Validators.required, Validators.email]],
    }, { validators: this.emailsMatchValidator });
  }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'body-hidden');

    this.customOptions.startPosition = this.getStartingDay() -1;
    console.log((navigator.userAgent || navigator.vendor || '').toLowerCase());
  }

  get isInactiveUser(): boolean {
    return this.authService.userWithCalendarData?.isActive === false;
  }

  get email() {
    return this.form.get('email');
  }

  get repeatEmail() {
    return this.form.get('repeatEmail');
  }

  get emailsMismatch(): boolean {
    return this.form.hasError('emailsMismatch') && !!this.form.get('repeatEmail')?.value;
  }

  onResend() {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.authService.registerUser({ email: this.form.value.email }).subscribe({
      next: (res) => {
        this.cookieService.delete('mayo_auth_token', '/');
        this.router.navigate(['/email-confirmation'], { queryParams: { email: this.form.value.email } });

        if(res?.token) {
          setTimeout(() => {
            this.cookieService.set('mayo_auth_token', res.token, 30, '/');
          }, 2000);

        }
      },
      error: (err) => {

      }
    });
  }

  checkIfUserHasOpenedDay(day: number): boolean {
    const user = this.authService.userWithCalendarData;
    if (!user || !user.adventCalendar) {
      return false;
    }
    const entry = user.adventCalendar.find(d => d.day === day);
    // console.log('checking day', day, entry);

    return !!entry?.isOpen;
  }

  checkIfUserHasMissedDay(day: number): boolean {
    const user = this.authService.userWithCalendarData;
    if (!user || !user.adventCalendar) {
      return false;
    }
    const entry = user.adventCalendar.find(d => d.day === day);
    return !!entry?.isMissed;
  }

  getStartingDay(): number {
    const now = new Date();
    const polandDate = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Warsaw' }));

    let day = polandDate.getDate();
    return this.checkIfUserHasOpenedDay(day) ? day + 1 : day;
  }

  private emailsMatchValidator(group: FormGroup) {
    const emailValue = group.get('email')?.value ?? '';
    const repeatValue = group.get('repeatEmail')?.value ?? '';
    return emailValue.trim().toLowerCase() === repeatValue.trim().toLowerCase()
      ? null
      : { emailsMismatch: true };
  }


}
