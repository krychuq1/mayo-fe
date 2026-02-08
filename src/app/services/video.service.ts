import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private readonly url = `${environment.backend}/videos`;

  videoUrl = signal('');
  userEmail = signal('');

  constructor(private readonly httpClient: HttpClient) {}

  getVideo(token: string): Observable<{ iframeUrl: string; token: string; expires: number }> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.httpClient.get<{ iframeUrl: string; token: string; expires: number }>(this.url, { headers });
  }

  requestNewLink(email: string): Observable<void> {
    return this.httpClient.post<void>(`${this.url}/resend`, { email });
  }
}
