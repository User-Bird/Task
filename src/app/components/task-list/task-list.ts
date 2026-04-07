import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { TaskCard } from '../task-card/task-card';
import { Header } from '../header/header';
import { TaskStatus, TaskPriority } from '../../models/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterLink, FormsModule, TaskCard, Header],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {
  taskService = inject(TaskService);

  search = signal('');
  filterStatus = signal<TaskStatus | 'all'>('all');
  filterPriority = signal<TaskPriority | 'all'>('all');
  sortBy = signal<'dueDate' | 'priority' | 'title'>('dueDate');

  ngOnInit(): void {
    this.taskService.loadTasks();
  }

  filteredTasks = computed(() => {
    let list = this.taskService.tasks();
    const s = this.search().toLowerCase();
    const status = this.filterStatus();
    const priority = this.filterPriority();
    const sort = this.sortBy();

    if (s) list = list.filter(t => t.title.toLowerCase().includes(s));
    if (status !== 'all') list = list.filter(t => t.status === status);
    if (priority !== 'all') list = list.filter(t => t.priority === priority);

    return [...list].sort((a, b) => {
      if (sort === 'dueDate') return a.dueDate.localeCompare(b.dueDate);
      if (sort === 'title') return a.title.localeCompare(b.title);
      const p = { high: 0, medium: 1, low: 2 };
      return p[a.priority] - p[b.priority];
    });
  });
}
