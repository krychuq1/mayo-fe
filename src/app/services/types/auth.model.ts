export interface registerModel {
  email: string;
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
  createdAt: Date;
}
