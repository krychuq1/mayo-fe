import { Component, inject, signal, afterNextRender, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

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

  videoUrl = signal<SafeUrl | null>(null);

  overlayStyle = signal<{ top: string; left: string; display: string }>({
    top: '10%',
    left: '10%',
    display: 'none'
  });

  private overlayInterval: any;
  private overlayTimeout: any;
  userEmail = 'patrycja.musur@gmail.com';

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
    const token = this.cookieService.get('mayo_auth_token');
    const fileKey = 'low/';
    const baseUrl = `http://192.168.0.107:3000/videos/${encodeURIComponent(fileKey)}`;
    const fullUrl = `${baseUrl}?token=${token}`;

    this.videoUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl));
  }
}
