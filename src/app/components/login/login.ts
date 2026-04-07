import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { Toast } from '../../services/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);
  private toast = inject(Toast);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMsg = '';
  loading = false;

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMsg = '';

    this.auth.login(this.form.value as any).subscribe({
      next: () => {
        this.toast.success('Connexion réussie !');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMsg = err.message || 'Erreur de connexion';
        this.loading = false;
      }
    });
  }
}
