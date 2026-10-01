import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular';
import { DatosNuevaTarea, Prioridad, Tarea } from '../../models/tarea.interface';

@Component({
  selector: 'app-tarea-form',
  templateUrl: './tarea-form.component.html',
  styleUrls: ['./tarea-form.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonFooter,
    IonHeader,
    IonInput,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonText,
    IonTextarea,
    IonTitle,
    IonToolbar,
    ReactiveFormsModule,
  ],
})
export class TareaFormComponent implements OnInit {
  @Input() tarea?: Tarea;
  private readonly formBuilder = inject(FormBuilder);
  private readonly modalController = inject(ModalController);

  readonly formulario = this.formBuilder.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
    descripcion: ['', [Validators.required, Validators.maxLength(120)]],
    prioridad: ['Media' as Prioridad, Validators.required],
  });

  ngOnInit(): void {
    if (this.tarea) {
      this.formulario.patchValue({
        titulo: this.tarea.titulo,
        descripcion: this.tarea.descripcion,
        prioridad: this.tarea.prioridad,
      });
    }
  }

  get estaEditando(): boolean {
    return this.tarea !== undefined;
  }

  cancelar(): void {
    void this.modalController.dismiss(undefined, 'cancel');
  }

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos: DatosNuevaTarea = this.formulario.getRawValue();
    void this.modalController.dismiss(datos, 'confirm');
  }
}
