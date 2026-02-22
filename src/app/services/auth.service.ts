import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {registerModel, User, UserWithCalendarData} from './types/auth.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendUrl = `${environment.backend}/auth`;
  userWithCalendarData: UserWithCalendarData | null = null;
  user: User | null = null;
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly cookieService: CookieService,
  ) {

  }

  registerUser(registerBody: registerModel): Observable<{token: string}> {
    return this._httpClient.post<{token: string}>(this.backendUrl, registerBody);
  }

  validateToken(token: string): Observable<UserWithCalendarData> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this._httpClient.get<UserWithCalendarData>(`${this.backendUrl}/validate-token`, { headers });
  }

  validateVideoAccess(token: string): Observable<User> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this._httpClient.get<User>(`${this.backendUrl}/validate-video-access`, { headers });
  }

  activateUser(token: string): Observable<UserWithCalendarData> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this._httpClient.get<UserWithCalendarData>(`${this.backendUrl}/activate-user`, { headers });
  }

  setUser(user: User) {
    this.user = user;
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
