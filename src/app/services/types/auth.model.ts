export interface registerModel {
  email: string;
}

export interface TokenResponse {
  token: string;
  isTokenActivated: boolean;
}

export type UserWithCalendarData = {
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  adventCalendar: adventCalendar[];
}

export interface adventCalendar {
  day: number;
  isOpen: boolean;
  isMissed: boolean;
  createdAt: Date;
}
