import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdventCalendar } from './advent-calendar';
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('AdventCalendar', () => {
  let component: AdventCalendar;
  let fixture: ComponentFixture<AdventCalendar>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventCalendar, ReactiveFormsModule],
      providers: [
        {
          provide: AuthService,
          useValue: { userWithCalendarData: null }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventCalendar);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  function setInactiveUser() {
    authService.userWithCalendarData = { isActive: false } as any;
  }

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('shows inactive overlay when user is not active', () => {
    setInactiveUser();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.inactive-overlay')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('owl-carousel-o')).toBeFalsy();
  });

  it('shows calendar when user is active', () => {
    authService.userWithCalendarData = { isActive: true } as any;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.inactive-overlay')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('owl-carousel-o')).toBeTruthy();
  });

  it('disables resend when emails mismatch', () => {
    setInactiveUser();
    fixture.detectChanges();
    component.form.patchValue({ email: 'a@test.com', repeatEmail: 'b@test.com' });
    component.submitted = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.inactive-card button');
    expect(button.disabled).toBeTrue();
    expect(component.emailsMismatch).toBeTrue();
  });

  it('allows resend when emails match', () => {
    spyOn(console, 'log');
    setInactiveUser();
    fixture.detectChanges();
    component.form.patchValue({ email: 'a@test.com', repeatEmail: 'a@test.com' });
    component.onResend();
    expect(component.form.valid).toBeTrue();
    expect(console.log).toHaveBeenCalledWith('Resend verification to', 'a@test.com');
  });
});
