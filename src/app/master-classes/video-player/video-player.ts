import { Component, OnInit } from '@angular/core';
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
  safeVideoUrl!: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private videoService: VideoService,
  ) {}

  ngOnInit(): void {
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.videoService.videoUrl()
    );
  }
}
