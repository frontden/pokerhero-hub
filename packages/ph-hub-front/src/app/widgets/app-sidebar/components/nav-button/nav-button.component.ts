import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { IconsModule } from '../../../../modules/icons/icons.module';

@Component({
  selector: 'ph-nav-button',
  standalone: true,
  imports: [CommonModule, IconsModule],
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.scss'],
})
export class NavButtonComponent {
  @Input() path!: string;
  @Input() label!: string;
  @Input() iconName!: string;
  @Input() isActive = false;
  @Output() navigate = new EventEmitter<string>();

  onClick() {
    this.navigate.emit(this.path);
  }
}