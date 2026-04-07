import { Pipe, PipeTransform } from '@angular/core';
import { TaskPriority } from '../models/task';

@Pipe({
  name: 'priorityLabel',
  standalone: true
})
export class PriorityLabelPipe implements PipeTransform {
  transform(value: TaskPriority): string {
    const labels: Record<TaskPriority, string> = {
      'high': '🔴 Haute',
      'medium': '🟡 Moyenne',
      'low': '🟢 Basse'
    };
    return labels[value] || value;
  }
}
