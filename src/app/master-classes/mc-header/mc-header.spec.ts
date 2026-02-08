import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McHeader } from './mc-header';

describe('McHeader', () => {
  let component: McHeader;
  let fixture: ComponentFixture<McHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
