import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.css'
})
export class StatsCard {
  label = input.required<string>();
  count = input.required<number>();
  color = input<string>('indigo');
  icon = input<string>('📋');
}
