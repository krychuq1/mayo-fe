import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { registerModel, TokenResponse, UserWithCalendarData } from './types/auth.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendUrl = `${environment.backend}/auth`;
  userWithCalendarData: UserWithCalendarData | null = null;
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly cookieService: CookieService,
  ) {

  }

  registerUser(registerBody: registerModel): Observable<TokenResponse> {
    return this._httpClient.post<TokenResponse>(this.backendUrl, registerBody);
  }

  validateToken(token: string): Observable<UserWithCalendarData> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this._httpClient.get<UserWithCalendarData>(`${this.backendUrl}/validate-token`, { headers });
  }

  activateUser(token: string): Observable<UserWithCalendarData> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this._httpClient.get<UserWithCalendarData>(`${this.backendUrl}/activate-user/${token}`, { headers });
  }

  checkTokenStatus(token: string): Observable<boolean> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this._httpClient.get<boolean>(`${this.backendUrl}/check-token-status`, { headers });
  }

  setUserWithCalendarData(data: UserWithCalendarData) {
    this.userWithCalendarData = data;
  }
  openDay(dayId: number): Observable<UserWithCalendarData> {
    const token = this.cookieService.get('mayo_auth_token');

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this._httpClient.put<UserWithCalendarData>(`${this.backendUrl}/open-day/${dayId}`, {}, { headers });

  }


  checkIfUserOpenAllDays(token: string): Observable<boolean> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this._httpClient.get<boolean>(`${this.backendUrl}/check-open-all-days`, { headers });
  }

}
