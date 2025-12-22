import { NgModule } from '@angular/core';
import {
  ChevronDown, LoaderCircle,
  LucideAngularModule,
  Mail,
} from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({
      Mail,
      ChevronDown,
      LoaderCircle,
    })
  ],
  exports: [LucideAngularModule]
})
export class IconsModule {}
