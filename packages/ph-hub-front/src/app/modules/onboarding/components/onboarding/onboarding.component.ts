import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { UserApiService } from '../../../../services/user-api.service';
import { CreateHero } from '../../../hero-avatar/create-hero/create-hero.component';
import { FormFieldComponent } from '../../../../widgets/form-field/form-field.component';
import { FormFieldControlDirective } from '../../../../widgets/form-field/directories/form-field-control.directive';
import { ButtonComponent } from '../../../../widgets/button/button.component';
import { LucideAngularModule } from 'lucide-angular';
import { CreateUserPreferencesRequest } from '@ph-hub/common';

@Component({
  selector: 'ph-onboarding',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CreateHero,
    FormFieldComponent,
    FormFieldControlDirective,
    ButtonComponent,
    LucideAngularModule
  ],
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userApiService = inject(UserApiService);
  private authService = inject(AuthService);
  private router = inject(Router);

  currentStep = signal(1);
  loading = signal(false);
  error = signal<string | null>(null);
  avatarLayers = signal<string[]>([]);

  readonly totalSteps = 2;
  readonly limitsOptions = ['Low (up to 5)', 'Mid (5-25)', 'High (50+)'];
  readonly pokerRoomsOptions = ['Winamax', 'PokerStars', 'GGPoker', 'RedStar', 'Other'];

  profileForm: FormGroup;
  preferencesForm: FormGroup;

  ngOnInit() {
    this.initForms();
    this.loadUserData();
    this.setupFormWatchers();
  }

  private initForms() {
    this.profileForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.preferencesForm = this.fb.group({
      gameType: ['', Validators.required],
      spinType: [''],
      limits: [[], Validators.required],
      pokerRooms: [[], Validators.required]
    });
  }

  private loadUserData() {
    this.authService.getCurrentUser().subscribe({
      next: (user: any) => {
        const nickname = user.nickname || user.email.split('@')[0];
        this.profileForm.patchValue({ nickname });

        if (user.avatar?.length > 0) {
          this.avatarLayers.set(user.avatar);
        }
      },
      error: () => {
        this.error.set('Failed to load user data');
      }
    });
  }

  private setupFormWatchers() {
    this.preferencesForm.get('gameType')?.valueChanges.subscribe(gameType => {
      const spinTypeControl = this.preferencesForm.get('spinType');
      if (gameType === 'spin') {
        spinTypeControl?.setValidators([Validators.required]);
      } else {
        spinTypeControl?.clearValidators();
        spinTypeControl?.setValue('');
      }
      spinTypeControl?.updateValueAndValidity();
    });
  }

  onAvatarChange(layers: string[]) {
    this.avatarLayers.set(layers);
  }

  nextStep() {
    if (this.currentStep() < this.totalSteps && this.canProceedFromCurrentStep()) {
      this.currentStep.set(this.currentStep() + 1);
      this.error.set(null);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
      this.error.set(null);
    }
  }

  private canProceedFromCurrentStep(): boolean {
    switch (this.currentStep()) {
      case 1:
        return this.profileForm.valid && this.avatarLayers().length > 0;
      case 2:
        return this.preferencesForm.valid;
      default:
        return false;
    }
  }

  toggleLimit(limit: string) {
    const limits = [...(this.preferencesForm.get('limits')?.value || [])];
    const index = limits.indexOf(limit);

    if (index > -1) {
      limits.splice(index, 1);
    } else {
      limits.push(limit);
    }

    this.preferencesForm.patchValue({ limits });
  }

  isLimitSelected(limit: string): boolean {
    return this.preferencesForm.get('limits')?.value?.includes(limit) || false;
  }

  togglePokerRoom(room: string) {
    const rooms = [...(this.preferencesForm.get('pokerRooms')?.value || [])];
    const index = rooms.indexOf(room);

    if (index > -1) {
      rooms.splice(index, 1);
    } else {
      rooms.push(room);
    }

    this.preferencesForm.patchValue({ pokerRooms: rooms });
  }

  isPokerRoomSelected(room: string): boolean {
    return this.preferencesForm.get('pokerRooms')?.value?.includes(room) || false;
  }

  completeOnboarding() {
    if (!this.canProceedFromCurrentStep()) {
      this.error.set('Please fill all required fields');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const data: CreateUserPreferencesRequest = {
      nickname: this.profileForm.value.nickname,
      avatar: this.avatarLayers(),
      gameType: this.preferencesForm.value.gameType,
      spinType: this.preferencesForm.value.spinType,
      limits: this.preferencesForm.value.limits,
      pokerRooms: this.preferencesForm.value.pokerRooms,
    };

    this.userApiService.completeOnboarding(data).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Failed to save. Please try again.');
        this.loading.set(false);
      }
    });
  }

  getProgressPercent(): number {
    return (this.currentStep() / this.totalSteps) * 100;
  }
}