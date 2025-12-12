import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isMouseDown = signal<boolean>(false);

  changeMouseDownState(newValue: boolean) {
    this.isMouseDown.set(newValue);
  }
}