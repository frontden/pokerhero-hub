import { Component, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormFieldComponent } from '../../../widgets/form-field/form-field.component';
import { FormFieldControlDirective } from '../../../widgets/form-field/directories/form-field-control.directive';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pack, SpinGameType } from '@ph-hub/common';
import { ButtonComponent } from '../../../widgets/button/button.component';

@Component({
  selector: 'ph-create-pack-dialog',
  imports: [
    FormFieldComponent,
    FormFieldControlDirective,
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './create-pack-dialog.html',
  styleUrl: './create-pack-dialog.scss',
})
export class CreatePackDialog {
  dialogRef = inject<DialogRef<Pack>>(DialogRef<Pack>);

  gameTypes = SpinGameType;
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    gameType: new FormControl(this.gameTypes.regular, Validators.required),
    description: new FormControl(''),
  });

  createPack(): void {
    const newPack: Pack = {
      title: this.form.get('title').value,
      description: this.form.get('description').value,
      gameType: this.form.get('gameType').value,
      charts: [],
    };
    this.dialogRef.close(newPack);
  }
}
