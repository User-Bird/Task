import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Dashboard } from './dashboard';

// MOCK IntersectionObserver — the test runs in Node.js which has no browser APIs.
// @defer (on viewport) in your template uses IntersectionObserver to watch when
// elements scroll into view. Without this mock the whole test crashes.
(globalThis as any).IntersectionObserver = class {
  observe() {} // called when Angular registers an element to watch
  unobserve() {} // called when Angular stops watching an element
  disconnect() {} // called when Angular tears down the component
};

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
