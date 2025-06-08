import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LabelModule, InputsModule, ButtonsModule, TextBoxModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  loginError = signal<string | null>(null);
  isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      ssoid: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  login(): void {
    this.submitted = true;
    this.loginError.set(null);

    if (this.loginForm.invalid) return;

    const { ssoid, password } = this.loginForm.value;
    this.isLoading.set(true);

    this.authService.login(ssoid, password).subscribe({
      next: () => {
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/dashboard']);
      },
      error: (err: Error) => {
        this.loginError.set(err.message);
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false),
    });
  }
}
