import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { VideoService } from './video.service';

export const mcVideoGuard: CanActivateFn = async (route) => {
  const videoService = inject(VideoService);
  const router = inject(Router);

  const token = route.params['token'] as string;
  console.log('here is the token', token);
  try {
    const res = await firstValueFrom(videoService.getVideo(token));
    videoService.videoUrl.set(res.iframeUrl);

    // Decode JWT payload to extract email
    const payload = JSON.parse(atob(token.split('.')[1]));
    videoService.userEmail.set(payload.email ?? '');

    return true;
  } catch {
    return router.createUrlTree(['/video/expired']);
  }
};
