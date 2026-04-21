import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Task, TaskStatus } from '../models/task';
import { Auth } from './auth';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private auth = inject(Auth);
  private apiUrl = 'http://localhost:3000/tasks';

  private _tasks = signal<Task[]>([]);
  private _loaded = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

  readonly tasks = this._tasks.asReadonly();

  readonly todoCount = computed(() => this._tasks().filter((t) => t.status === 'todo').length);
  readonly inProgressCount = computed(
    () => this._tasks().filter((t) => t.status === 'in-progress').length,
  );
  readonly doneCount = computed(() => this._tasks().filter((t) => t.status === 'done').length);
  readonly totalCount = computed(() => this._tasks().length);
  readonly completionRate = computed(() => {
    const total = this.totalCount();
    return total === 0 ? 0 : Math.round((this.doneCount() / total) * 100);
  });

  constructor() {
    let previousUserId: string | number | null | undefined = undefined;

    effect(() => {
      const currentId = this.auth.currentUser()?.id ?? null;

      // Skip the very first run (app init), only react to actual changes
      if (previousUserId !== undefined && previousUserId !== currentId) {
        this._tasks.set([]);
        this._loaded.set(false);
      }

      previousUserId = currentId;
    });
  }

  loadTasks(): void {
    if (this._loaded()) return;
    this.loading.set(true);
    this.error.set(null);
    const userId = this.auth.currentUser()?.id;
    const url = userId ? `${this.apiUrl}?userId=${userId}` : this.apiUrl;

    this.http
      .get<Task[]>(url)
      .pipe(
        tap(() => {
          this.loading.set(false);
          this._loaded.set(true);
        }),
        catchError((err) => {
          this.loading.set(false);
          this.error.set('Impossible de charger les tâches');
          return throwError(() => err);
        }),
      )
      .subscribe((data) => this._tasks.set(data));
  }

  getById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  create(task: Omit<Task, 'id' | 'createdAt'>): Observable<Task> {
    const newTask = {
      ...task,
      userId: this.auth.currentUser()?.id ?? 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    return this.http.post<Task>(this.apiUrl, newTask).pipe(
      tap((created) => {
        this._tasks.update((list) => [created, ...list]);
      }),
    );
  }

  update(id: number, changes: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, changes).pipe(
      tap((updated) => {
        this._tasks.update((list) => list.map((t) => (t.id === id ? { ...t, ...updated } : t)));
      }),
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this._tasks.update((list) => list.filter((t) => t.id !== id));
      }),
    );
  }

  updateStatus(id: number, status: TaskStatus): Observable<Task> {
    return this.update(id, { status });
  }

  reload(): void {
    this._loaded.set(false);
    this.loadTasks();
  }
}
