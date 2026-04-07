import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Auth } from './auth';

describe('Auth', () => {
  let service: Auth;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(Auth);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should handle successful login (login réussi)', () => {
    service.login({ email: 'test@mail.com', password: 'password' }).subscribe(user => {
      expect(user.name).toBe('Test User');
      expect(service.isAuthenticated()).toBe(true);
    });

    const req = httpMock.expectOne(r => r.url.includes('/users?email=test@mail.com'));
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, name: 'Test User', email: 'test@mail.com' }]);
  });

  it('should handle failed login (login échoué)', () => {
    service.login({ email: 'wrong@mail.com', password: 'wrong' }).subscribe({
      error: err => {
        expect(err.message).toBe('Email ou mot de passe incorrect');
      }
    });

    const req = httpMock.expectOne(r => r.url.includes('/users?email=wrong@mail.com'));
    req.flush([]); // Return empty array to simulate user not found
  });
});
