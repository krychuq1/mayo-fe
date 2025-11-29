import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {registerModel, UserWithCalendarData} from './types/auth.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendUrl = `${environment.backend}/auth`;
  userWithCalendarData: UserWithCalendarData | null = null;
  constructor(
    private readonly _httpClient: HttpClient
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

  activateUser(token: string): Observable<UserWithCalendarData> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this._httpClient.get<UserWithCalendarData>(`${this.backendUrl}/activate-user`, { headers });
  }

  setUserWithCalendarData(data: UserWithCalendarData) {
    this.userWithCalendarData = data;
  }

}
