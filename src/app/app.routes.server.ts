import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'video/:token',
    renderMode: RenderMode.Client
  },
  {
    path: 'unsubscribe/:email',
    renderMode: RenderMode.Client
  },
  {
    path: 'success',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
];
