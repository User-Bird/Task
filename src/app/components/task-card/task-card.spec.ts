import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCard } from './task-card';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('TaskCard', () => {
  let component: TaskCard;
  let fixture: ComponentFixture<TaskCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCard],
      providers: [provideRouter([]), provideHttpClient()] // Supply Router and HTTP
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCard);
    component = fixture.componentInstance;

    // Provide the required Task input
    fixture.componentRef.setInput('task', {
      id: 1, title: 'Test Task', description: 'Test',
      status: 'todo', priority: 'medium', dueDate: '2026-05-01',
      userId: 1, createdAt: '2026-04-01'
    });

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
