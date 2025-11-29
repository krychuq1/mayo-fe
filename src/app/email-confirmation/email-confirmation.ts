import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cookieService: CookieService) {
    this.route.queryParamMap.subscribe(params => {
      this.email = params.get('email') ?? '';
    });
  }

  ngOnDestroy(): void {
    console.log(("Initialize method not implemented."));
    }

  ngOnInit(): void {
    // check if token exisit
    if(this.cookieService.check('mayo_auth_token')) {
      this.router.navigate(['/']);
    }
  }
}
