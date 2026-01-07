import { NgModule } from '@angular/core';
import {
  ChartBarBig,
  ChevronDown,
  Dices,
  Dumbbell,
  LoaderCircle,
  LucideAngularModule,
  Mail,
  Settings,
  SquarePlay,
  XIcon,
} from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({
      Mail,
      ChevronDown,
      LoaderCircle,
      Dices,
      XIcon,
      Dumbbell,
      ChartBarBig,
      SquarePlay,
      Settings,
    })
  ],
  exports: [LucideAngularModule]
})
export class IconsModule {}
