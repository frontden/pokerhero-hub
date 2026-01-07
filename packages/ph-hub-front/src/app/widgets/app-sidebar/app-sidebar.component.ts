import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HeroAvatar } from '../../modules/hero-avatar/hero-avatar/hero-avatar';
import { IconsModule } from '../../modules/icons/icons.module';
import { NavButtonComponent } from './components/nav-button/nav-button.component';
import { User } from '@ph-hub/common';

@Component({
  selector: 'ph-app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NavButtonComponent,
    HeroAvatar,
    IconsModule,
  ],
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss'],
})
export class AppSidebarComponent {
  profile = input.required<User>();

  constructor(private router: Router) {}

  navigate(path: string) {
    if (this.router.url === path) {
      return;
    }
    this.router.navigate([path]);
  }

  isRouteActive(path: string): boolean {
    return this.router.url.startsWith(path);
  }

  isExactRouteActive(path: string): boolean {
    return this.router.url === path;
  }

  // logout() {}
}