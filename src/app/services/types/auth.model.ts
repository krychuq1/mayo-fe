export interface registerModel {
  email: string;
}

export type User = {
  email       : string;
  createdAt  : Date;
  updatedAt  : Date;
}

export type UserWithCalendarData = {
  email       : string;
  isActive  : boolean;
  createdAt  : Date;
  updatedAt  : Date;
  adventCalendar: adventCalendar[];
}

export interface adventCalendar {
  day: number;
  isOpen: boolean;
  isMissed: boolean;
  createdAt: Date;
}
