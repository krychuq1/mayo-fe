import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private readonly url = `${environment.backend}/checkout`;

  constructor(private readonly httpClient: HttpClient) {}

  createCheckoutSession(): Observable<{ url: string }> {
    return this.httpClient.get<{ url: string }>(this.url);
  }
}
