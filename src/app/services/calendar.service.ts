import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VintedItem} from './types/vinted-item.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  backendUrl = `${environment.backend}/vinted-item`;
  constructor(private readonly _httpClient: HttpClient) {
  }

  openDay(day: number): Observable<VintedItem[]> {
    return this._httpClient.get<VintedItem[]>(`${this.backendUrl}/day/${day}`);
  }
}
