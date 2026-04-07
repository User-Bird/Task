import { Component, input, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task, TaskStatus } from '../../models/task';
import { TaskService } from '../../services/task';
import { Toast } from '../../services/toast';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-card.html',
  styleUrl: './task-card.css'
})
export class TaskCard {
  task = input.required<Task>();
  deleted = output<number>();

  private taskService = inject(TaskService);
  private toast = inject(Toast);

  get isOverdue(): boolean {
    const t = this.task();
    return t.status !== 'done' && new Date(t.dueDate) < new Date();
  }

  changeStatus(status: TaskStatus): void {
    this.taskService.updateStatus(this.task().id, status).subscribe({
      next: () => this.toast.success('Statut mis à jour'),
      error: () => this.toast.error('Erreur lors de la mise à jour')
    });
  }

  confirmDelete(): void {
    if (confirm('Supprimer cette tâche ?')) {
      this.taskService.delete(this.task().id).subscribe({
        next: () => {
          this.toast.success('Tâche supprimée');
          this.deleted.emit(this.task().id);
        },
        error: () => this.toast.error('Erreur lors de la suppression')
      });
    }
  }
}
