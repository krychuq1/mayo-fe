import { Component, ElementRef, OnInit, ViewChild, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { McFooter } from '../footer/footer';
import { McHeader } from '../mc-header/mc-header';
import { VideoService } from '../../services/video.service';
import {McPrivacyNotice} from '../privacy-notice/privacy-notice';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [
    CommonModule,
    McFooter,
    McHeader,
    McPrivacyNotice,
  ],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
})
export class VideoPlayer implements OnInit {
  @ViewChild('videoHolder', { static: true })
  videoHolderRef!: ElementRef<HTMLDivElement>;

  safeVideoUrl!: SafeResourceUrl;
  isFullscreen = false;

  // Watermark flash state
  showWatermark = signal(false);
  watermarkTop = signal(0);
  watermarkLeft = signal(0);
  private flashInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private videoService: VideoService,
  ) {}

  get userEmail(): string {
    return this.videoService.userEmail();
  }

  ngOnInit(): void {
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.videoService.videoUrl()
    );
    this.startWatermarkFlash();
  }

  ngOnDestroy(): void {
    if (this.flashInterval) {
      clearInterval(this.flashInterval);
    }
  }

  private startWatermarkFlash(): void {
    // Show immediately on load, then every 60s
    this.flashWatermark();

    this.flashInterval = setInterval(() => {
      this.flashWatermark();
    }, 60_000); // every 1 min
  }


  private flashWatermark(): void {
    // Random position — keep within 10%-80% to avoid edges/controls
    this.watermarkTop.set(Math.floor(Math.random() * 70) + 10);
    this.watermarkLeft.set(Math.floor(Math.random() * 60) + 10);

    this.showWatermark.set(true);

    setTimeout(() => {
      this.showWatermark.set(false);
    }, 2000); // visible for 2 seconds
  }

  private isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  }

  toggleFullscreen(): void {
    const container = this.videoHolderRef.nativeElement;

    if (this.isIOS()) {
      // CSS fallback for iOS (Fullscreen API not supported on non-video elements)
      this.isFullscreen = !this.isFullscreen;
      container.classList.toggle('ios-fullscreen', this.isFullscreen);
      return;
    }

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err: Error) => {
        console.error('Fullscreen failed:', err.message);
      });
    } else {
      document.exitFullscreen();
    }
  }

  @HostListener('document:fullscreenchange')
  @HostListener('document:webkitfullscreenchange')
  onFullscreenChange(): void {
    this.isFullscreen = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
  }
}
