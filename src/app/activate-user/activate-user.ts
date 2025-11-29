import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-activate-user',
  imports: [],
  templateUrl: './activate-user.html',
  styleUrl: './activate-user.scss'
})
export class ActivateUser implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly token = this.route.snapshot.paramMap.get('token')!;

  constructor(private authService: AuthService,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.authService.activateUser(this.token)
      .subscribe({
      next: (res) => {
        this.cookieService.set('mayo_auth_token', this.token, 30, '/');
        this.authService.setUserWithCalendarData(res);
        // navigate to home
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('token invalid: ', err);
      }
    });
    // console.log('we have token mf: ', this.token);
  }

}
