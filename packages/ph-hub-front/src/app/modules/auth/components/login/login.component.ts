import { Component, signal, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ButtonComponent } from '../../../../widgets/button/button.component';
import { FormFieldComponent } from '../../../../widgets/form-field/form-field.component';
import { FormFieldControlDirective } from '../../../../widgets/form-field/directories/form-field-control.directive';

@Component({
  selector: 'ph-login',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    FormFieldComponent,
    FormFieldControlDirective
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  emailForm: FormGroup;
  codeForm: FormGroup;

  step = signal<'email' | 'code'>('email');
  loading = signal(false);
  error = signal<string | null>(null);
  countdown = signal(0);

  private countdownInterval?: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  onSendCode() {
    if (this.emailForm.invalid) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const email = this.emailForm.value.email;

    this.authService.sendVerificationCode(email).subscribe({
      next: (response) => {
        this.step.set('code');
        this.loading.set(false);
        this.startCountdown();
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Failed to send code. Please try again.');
        this.loading.set(false);
      },
    });
  }

  onVerifyCode() {
    if (this.codeForm.invalid) return;

    this.loading.set(true);
    this.error.set(null);

    const email = this.emailForm.value.email;
    const code = this.codeForm.value.code;

    this.authService.verifyCode(email, code).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/demo']);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Invalid code. Please try again.');
        this.loading.set(false);
        this.codeForm.reset();
      }
    });
  }

  onResendCode() {
    this.codeForm.reset();
    this.error.set(null);
    this.onSendCode();
  }

  onBack() {
    this.step.set('email');
    this.codeForm.reset();
    this.error.set(null);
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  private startCountdown() {
    this.countdown.set(60);
    this.countdownInterval = setInterval(() => {
      const current = this.countdown();
      this.countdown.set(current - 1);
      if (this.countdown() <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }
}