import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast'; // <-- Updated import
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('ToastComponent', () => { // <-- Updated description
  let component: ToastComponent; // <-- Updated type
  let fixture: ComponentFixture<ToastComponent>; // <-- Updated type

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent], // <-- Updated import
      providers: [provideRouter([]), provideHttpClient()] // <-- ADD THIS LINE
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent); // <-- Updated component
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
