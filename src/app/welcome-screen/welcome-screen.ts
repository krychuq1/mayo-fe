import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

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
  }


  onSubmit() {
    console.log('submitting forumalrz');
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.authService.registerUser(this.form.value).subscribe({
      next: (res) => {
        if (res?.token) {
          this.cookieService.set('mayo_auth_token', res.token, 30, '/');
        }

        if (res.isTokenActivated) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/email-confirmation'], { queryParams: { email: this.form.value.email } });
        }
      },
      error: () => {
        console.log('we are here');
      }
    });
  }
}
