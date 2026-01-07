import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppSidebarComponent } from '../../widgets/app-sidebar/app-sidebar.component';
import { AuthService } from '../../services/auth.service';
import { User } from '@ph-hub/common';

@Component({
  selector: 'ph-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AppSidebarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  private authService = inject(AuthService);

  profile = signal<User | null>(null);

  ngOnInit() {
    this.loadUserData();
  }

  private loadUserData() {
    this.authService.getCurrentUser().subscribe({
      next: (user: any) => {
        this.profile.set(user);
      },
    });
  }
}