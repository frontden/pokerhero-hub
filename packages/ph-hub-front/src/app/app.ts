import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './services/app.service';

@Component({
  selector: 'ph-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  @HostListener('window:mouseup') onMouseUp() {
    this.appService.changeMouseDownState(false);
  }

  @HostListener('window:mousedown') onMouseDown() {
    this.appService.changeMouseDownState(true);
  }

  constructor(private appService: AppService) {
  }
}
