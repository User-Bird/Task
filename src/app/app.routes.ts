import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then(m => m.Login),
    canActivate: [guestGuard]
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register').then(m => m.Register),
    canActivate: [guestGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [authGuard]
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./components/task-list/task-list').then(m => m.TaskList),
    canActivate: [authGuard]
  },
  {
    path: 'tasks/new',
    loadComponent: () =>
      import('./components/task-form/task-form').then(m => m.TaskForm),
    canActivate: [authGuard]
  },
  {
    path: 'tasks/:id/edit',
    loadComponent: () =>
      import('./components/task-form/task-form').then(m => m.TaskForm),
    canActivate: [authGuard]
  },
  {
    path: 'tasks/:id',
    loadComponent: () =>
      import('./components/task-detail/task-detail').then(m => m.TaskDetail),
    canActivate: [authGuard]
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found').then(m => m.NotFound)
  }
];
