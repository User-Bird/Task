import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task';
import { Toast } from '../../services/toast';
import { Header } from '../header/header';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, Header],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm implements OnInit {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toast = inject(Toast);

  isEditMode = false;
  taskId: number | null = null;
  loading = false;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    status: ['todo'],
    priority: ['medium'],
    dueDate: ['', Validators.required]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.taskId = +id;
      this.taskService.getById(this.taskId).subscribe(task => {
        this.form.patchValue(task);
      });
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    const value = this.form.value as any;

    if (this.isEditMode && this.taskId) {
      this.taskService.update(this.taskId, value).subscribe({
        next: () => {
          this.toast.success('Tâche mise à jour !');
          this.router.navigate(['/tasks']);
        },
        error: () => { this.toast.error('Erreur'); this.loading = false; }
      });
    } else {
      this.taskService.create(value).subscribe({
        next: () => {
          this.toast.success('Tâche créée !');
          this.router.navigate(['/tasks']);
        },
        error: () => { this.toast.error('Erreur'); this.loading = false; }
      });
    }
  }
}
