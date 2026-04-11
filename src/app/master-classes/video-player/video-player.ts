import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { McFooter } from '../footer/footer';
import { McHeader } from '../mc-header/mc-header';
import { VideoService } from '../../services/video.service';
import {McPrivacyNotice} from '../privacy-notice/privacy-notice';
import {Router} from '@angular/router';

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
  safeVideoUrl!: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private videoService: VideoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const videoUrl = this.videoService.videoUrl();
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);

    try {
      const expires = new URL(videoUrl).searchParams.get('expires');
      console.log(expires, Number(expires) * 1000 < Date.now());
      if (expires && Number(expires) * 1000 < Date.now()) {
        this.router.navigate(['video/expired']);
        return;
      }
    } catch {}

  }
}
