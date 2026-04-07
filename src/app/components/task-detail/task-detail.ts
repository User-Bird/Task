import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task';
import { Toast } from '../../services/toast';
import { Task } from '../../models/task';
import { Header } from '../header/header';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [RouterLink, Header],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css'
})
export class TaskDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private taskService = inject(TaskService);
  private toast = inject(Toast);

  task = signal<Task | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getById(+id).subscribe({
        next: (t) => { this.task.set(t); this.loading.set(false); },
        error: () => { this.toast.error('Tâche introuvable'); this.router.navigate(['/tasks']); }
      });
    }
  }

  delete(): void {
    if (!this.task() || !confirm('Supprimer cette tâche ?')) return;
    this.taskService.delete(this.task()!.id).subscribe({
      next: () => { this.toast.success('Tâche supprimée'); this.router.navigate(['/tasks']); },
      error: () => this.toast.error('Erreur')
    });
  }
}
