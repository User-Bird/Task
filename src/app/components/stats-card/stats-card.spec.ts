import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsCard } from './stats-card';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('StatsCard', () => {
  let component: StatsCard;
  let fixture: ComponentFixture<StatsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsCard],
      providers: [provideRouter([]), provideHttpClient()] // <-- ADD THIS LINE
    }).compileComponents();

    fixture = TestBed.createComponent(StatsCard);
    component = fixture.componentInstance;

    // Add required inputs before checking stability
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('count', 0);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
