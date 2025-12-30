import { NgModule } from '@angular/core';
import {
  ChevronDown,
  Dices,
  LoaderCircle,
  LucideAngularModule,
  Mail,
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
    })
  ],
  exports: [LucideAngularModule]
})
export class IconsModule {}
