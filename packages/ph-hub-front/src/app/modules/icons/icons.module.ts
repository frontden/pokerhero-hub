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
  Zap,
  NotebookText,
  CirclePlus,
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
      Zap,
      NotebookText,
      CirclePlus,
    })
  ],
  exports: [LucideAngularModule]
})
export class IconsModule {}
