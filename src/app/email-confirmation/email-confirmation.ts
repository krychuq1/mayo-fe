import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-email-confirmation',
  imports: [
    RouterLink
  ],
  templateUrl: './email-confirmation.html',
  styleUrl: './email-confirmation.scss'
})
export class EmailConfirmation implements OnInit, OnDestroy {
  email = '';

  private pollingSub: Subscription | null = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService) {
    this.route.queryParamMap.subscribe(params => {
      this.email = params.get('email') ?? '';
    });
  }

  ngOnDestroy(): void {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    const token = this.cookieService.get('mayo_auth_token');
    if (!token) {
      // No token, maybe user came here manually?
      // Just stay or navigate away?
      return;
    }

    // Start polling every 3 seconds
    this.pollingSub = interval(3000)
      .pipe(
        switchMap(() => this.authService.checkTokenStatus(token))
      )
      .subscribe({
        next: (isActive) => {
          if (isActive) {
            this.router.navigate(['/']);
          }
        },
        error: (err) => console.error('Polling error', err)
      });
  }
}
