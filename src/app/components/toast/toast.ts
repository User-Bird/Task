import { Component, inject } from '@angular/core';
import { Toast as ToastService } from '../../services/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.html',
  styleUrl: './toast.css'
})
export class ToastComponent {
  toastService = inject(ToastService);
}
