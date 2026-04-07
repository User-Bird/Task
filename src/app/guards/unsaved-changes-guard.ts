import { CanDeactivateFn } from '@angular/router';
import { TaskForm } from '../components/task-form/task-form';

export const unsavedChangesGuard: CanDeactivateFn<TaskForm> = (component) => {
  // If the form has been touched/changed and hasn't been submitted yet
  if (component.form.dirty && !component.isSubmitted) {
    return confirm('Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?');
  }
  return true;
};
