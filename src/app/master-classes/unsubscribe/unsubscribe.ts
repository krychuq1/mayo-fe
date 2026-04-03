import {Component, OnInit, signal, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {McFooter} from '../footer/footer';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-unsubscribe',
  imports: [McFooter],
  templateUrl: './unsubscribe.html',
  styleUrl: './unsubscribe.scss'
})
export class Unsubscribe implements OnInit {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  loading = signal(true);
  success = signal(false);
  error = signal(false);

  ngOnInit() {
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.authService.unsubscribe(email).subscribe({
        next: () => {
          this.loading.set(false);
          this.success.set(true);
        },
        error: () => {
          this.loading.set(false);
          this.error.set(true);
        },
      });
    }
  }
}
