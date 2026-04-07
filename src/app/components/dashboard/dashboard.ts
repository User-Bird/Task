import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { TaskService } from '../../services/task';
import { StatsCard } from '../stats-card/stats-card';
import { Header } from '../header/header';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, StatsCard, Header],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  auth = inject(Auth);
  taskService = inject(TaskService);

  ngOnInit(): void {
    this.taskService.loadTasks();
  }

  get recentTasks() {
    return this.taskService.tasks().slice(0, 5);
  }
}
