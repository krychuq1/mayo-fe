import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoService } from '../../../services/video.service';

@Component({
  selector: 'app-expired',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './expired.html',
  styleUrl: './expired.scss',
})
export class Expired {
  email = '';
  loading = signal(false);
  success = signal(false);
  error = signal(false);

  constructor(private videoService: VideoService) {}

  submit(): void {
    if (!this.email || this.loading()) return;

    this.loading.set(true);
    this.success.set(false);
    this.error.set(false);

    this.videoService.requestNewLink(this.email).subscribe({
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
