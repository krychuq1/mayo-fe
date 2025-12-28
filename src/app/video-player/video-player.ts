import { Component, inject, signal, afterNextRender, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import {AuthService} from '../services/auth.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss'
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  private sanitizer = inject(DomSanitizer);
  private cookieService = inject(CookieService);
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  videoUrl = signal<SafeUrl | null>(null);

  overlayStyle = signal<{ top: string; left: string; display: string }>({
    top: '10%',
    left: '10%',
    display: 'none'
  });

  private overlayInterval: any;
  private overlayTimeout: any;
  userEmail = this.authService.userWithCalendarData?.email || '1234!!23';

  constructor() {
    afterNextRender(() => {
      this.setupStream();
    });
  }

  ngOnInit() {
    this.startOverlayAnimation();
  }

  ngOnDestroy() {
    if (this.overlayInterval) {
      clearInterval(this.overlayInterval);
    }
    if (this.overlayTimeout) {
      clearTimeout(this.overlayTimeout);
    }
  }

  startOverlayAnimation() {
    // 1. Show immediately on load
    this.triggerOverlaySequence();

    // 2. Repeat every 30 seconds
    this.overlayInterval = setInterval(() => {
      this.triggerOverlaySequence();
    }, 30000);
  }

  triggerOverlaySequence() {
    this.randomizePosition();

    // Hide it after 2 seconds
    this.overlayTimeout = setTimeout(() => {
      this.hideOverlay();
    }, 2000);
  }

  hideOverlay() {
    this.overlayStyle.update(current => ({
      ...current,
      display: 'none'
    }));
  }

  randomizePosition() {
    const randomTop = Math.floor(Math.random() * 70) + 10;
    const randomLeft = Math.floor(Math.random() * 70) + 10;

    this.overlayStyle.set({
      top: `${randomTop}%`,
      left: `${randomLeft}%`,
      display: 'block'
    });
  }

  setupStream() {
    const streamUrl = `${environment.backend}/videos`;

    const token = this.cookieService.get('mayo_auth_token');
    const fileKey = 'low/';
    const baseUrl = `${environment.backend}/videos/${encodeURIComponent(fileKey)}`;
    const fullUrl = `${baseUrl}?token=${token}`;
    this.http.get<{ url: string }>(fullUrl).subscribe({
      next: (response) => {
        // [5] Set the S3 URL as the video source
        // This makes the browser download directly from AWS, bypassing your server
        this.videoUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(response.url));
      },
      error: (err) => {
      }
    });
    // this.videoUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl));
  }
}
