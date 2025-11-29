import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventCalendar } from './advent-calendar';

describe('AdventCalendar', () => {
  let component: AdventCalendar;
  let fixture: ComponentFixture<AdventCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
