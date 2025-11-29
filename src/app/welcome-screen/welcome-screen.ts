import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-welcome-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './welcome-screen.html',
  styleUrl: './welcome-screen.scss'
})
export class WelcomeScreen implements OnInit {
  // Reactive form containing the email control with validators
  form: FormGroup;
  // Flag to control showing validation messages only after submit
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router,
              private readonly authService: AuthService, private route: ActivatedRoute,
              private cookieService: CookieService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Convenience getter for easy, type-safe access in template
  get email(): FormControl { return this.form.get('email') as FormControl; }

  ngOnInit(): void {
    // this.authService.validateToken(this.cookieService.get('mayo_auth_token')).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: () => {
    //
    //   }
    // });
    // this.route.queryParamMap.subscribe(params => {
    //   const token = params.get('token');
    //   if (token) {
    //     this.handleToken(token);
    //   }
    // });
  }

  private handleToken(token: string): void {
    const queryParams = { ...this.route.snapshot.queryParams };
    delete queryParams['token'];
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      replaceUrl: true
    });
  }

  onSubmit() {
    console.log('submitting forumalrz');
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.authService.registerUser(this.form.value).subscribe({
      next: (res) => {
        this.router.navigate(['/email-confirmation'], { queryParams: { email: this.form.value.email } });

        if(res?.token) {
          setTimeout(() => {
            this.cookieService.set('mayo_auth_token', res.token, 30, '/');
          }, 2000);

        }
        // Handle successful registration if needed

      },
      error: () => {
        console.log('we are here');
      }
    });
  }
}
