import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { VideoService } from './video.service';

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number): void {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

export const mcVideoGuard: CanActivateFn = async (route) => {
  const videoService = inject(VideoService);
  const router = inject(Router);

  const token = route.params['token'] as string;
  const cookieKey = `video_access_${token}`;

  const cached = getCookie(cookieKey);
  if (cached) {
    const { iframeUrl, email } = JSON.parse(cached);
    videoService.videoUrl.set(iframeUrl);
    videoService.userEmail.set(email);
    return true;
  }

  try {
    const res = await firstValueFrom(videoService.getVideo(token));
    videoService.videoUrl.set(res.iframeUrl);

    const payload = JSON.parse(atob(token.split('.')[1]));
    const email = payload.email ?? '';
    videoService.userEmail.set(email);

    setCookie(cookieKey, JSON.stringify({ iframeUrl: res.iframeUrl, email }), 30);

    return true;
  } catch {
    return router.createUrlTree(['/video/expired']);
  }
};
