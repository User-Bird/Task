import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map, tap, catchError, throwError } from 'rxjs';
import { User, LoginRequest, AuthState } from '../models/user';

@Injectable({ providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000/users';

  private _authState = signal<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  readonly authState = this._authState.asReadonly();
  readonly currentUser = computed(() => this._authState().user);
  readonly isAuthenticated = computed(() => this._authState().isAuthenticated);
  readonly userName = computed(() => this._authState().user?.name ?? '');

  constructor() {
    this.loadFromStorage();
  }

  login(credentials: LoginRequest): Observable<User> {
    const cleanEmail = credentials.email.trim();
    const cleanPassword = credentials.password.trim();
    return this.http.get<User[]>(`${this.apiUrl}?email=${cleanEmail}`).pipe(
      map((users) => {
        const user = users[0]; // Get the first matched user

        // 3. Verify the password matches
        if (user && user.password === cleanPassword) {
          const authData = { user, token: 'fake-jwt-token', isAuthenticated: true };
          this._authState.set(authData);
          localStorage.setItem('auth', JSON.stringify(authData));
          return user;
        }

        // If it fails, throw the error to the component
        throw new Error('Email ou mot de passe incorrect');
      }),
    );
  }

  register(name: string, email: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrl, { name, email, password }).pipe(
      tap((user) => {
        const token = 'fake-jwt-' + btoa(user.email + ':' + Date.now());
        this._authState.set({
          user: { id: user.id, name: user.name, email: user.email },
          token,
          isAuthenticated: true,
        });
        localStorage.setItem('auth', JSON.stringify(this._authState()));
      }),
    );
  }

  logout(): void {
    this._authState.set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem('auth');
      if (data) {
        const parsed = JSON.parse(data);
        // Add this safety check: make sure it's actually an object and not null
        if (parsed && typeof parsed === 'object') {
          this._authState.set(parsed);
        } else {
          throw new Error('Invalid auth data');
        }
      }
    } catch {
      this._authState.set({ user: null, token: null, isAuthenticated: false });
      localStorage.removeItem('auth');
    }
  }
}
