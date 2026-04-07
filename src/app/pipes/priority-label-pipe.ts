import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityLabel',
})
export class PriorityLabelPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
