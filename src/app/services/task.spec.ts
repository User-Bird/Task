import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TaskService } from './task';
import { Task } from '../models/task';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'aucune requête n'est en attente
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load tasks from API', () => {
    const mockTasks: Task[] = [
      {
        id: 1, title: 'Test Task', description: 'Desc',
        status: 'todo', priority: 'high',
        dueDate: '2026-04-01', userId: 1, createdAt: '2026-03-25'
      }
    ];

    service.loadTasks();

    const req = httpMock.expectOne(r => r.url.includes('/tasks'));
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);

    expect(service.tasks().length).toBe(1);
    expect(service.tasks()[0].title).toBe('Test Task');
    expect(service.todoCount()).toBe(1);
  });

  it('should delete a task', () => {
    // Pré-charger une tâche directement dans le Signal privé
    service['_tasks'].set([{
      id: 1, title: 'To Delete', description: '',
      status: 'todo', priority: 'low',
      dueDate: '2026-04-01', userId: 1, createdAt: '2026-03-25'
    }]);

    service.delete(1).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/tasks/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);

    expect(service.tasks().length).toBe(0); // La tâche doit être supprimée du Signal
  });

  it('should compute completion rate correctly', () => {
    service['_tasks'].set([
      { id: 1, title: 'A', description: '', status: 'done', priority: 'low', dueDate: '', userId: 1, createdAt: '' },
      { id: 2, title: 'B', description: '', status: 'todo', priority: 'low', dueDate: '', userId: 1, createdAt: '' },
      { id: 3, title: 'C', description: '', status: 'done', priority: 'low', dueDate: '', userId: 1, createdAt: '' },
    ]);

    expect(service.completionRate()).toBe(67); // 2/3 = 66.67 -> arrondi à 67
    expect(service.doneCount()).toBe(2);
    expect(service.todoCount()).toBe(1);
    expect(service.totalCount()).toBe(3);
  });
});
