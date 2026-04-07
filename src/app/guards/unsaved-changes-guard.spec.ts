import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { unsavedChangesGuard } from './unsaved-changes-guard';
import { TaskForm } from '../components/task-form/task-form'; // <-- 1. Add this import

describe('unsavedChangesGuard', () => {
  // 2. Change <unknown> to <TaskForm> below:
  const executeGuard: CanDeactivateFn<TaskForm> = (...guardParameters) =>
    TestBed.runInInjectionContext(() => unsavedChangesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
