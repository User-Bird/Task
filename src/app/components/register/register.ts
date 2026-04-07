import { Component, inject } from '@angular/core';
import {
  FormBuilder, Validators, ReactiveFormsModule,
  AbstractControl, ValidationErrors
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { Toast } from '../../services/toast';

function passwordsMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirm = control.get('confirm')?.value;
  return password === confirm ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);
  private toast = inject(Toast);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm: ['', Validators.required]
  }, { validators: passwordsMatch });

  errorMsg = '';
  loading = false;

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMsg = '';
    const { name, email, password } = this.form.value;

    this.auth.register(name!, email!, password!).subscribe({
      next: () => {
        this.toast.success('Compte créé avec succès !');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMsg = err.message || 'Erreur lors de l\'inscription';
        this.loading = false;
      }
    });
  }
}
