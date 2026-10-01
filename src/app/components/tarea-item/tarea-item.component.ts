import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IonBadge,
  IonButton,
  IonCheckbox,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from '@ionic/angular';
import { Tarea } from '../../models/tarea.interface';

@Component({
  selector: 'app-tarea-item',
  templateUrl: './tarea-item.component.html',
  styleUrls: ['./tarea-item.component.scss'],
  standalone: true,
  imports: [
    IonBadge,
    IonButton,
    IonCheckbox,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
  ],
})
export class TareaItemComponent {
  @Input({ required: true }) tarea!: Tarea;
  @Output() readonly alternarSolicitado = new EventEmitter<number>();
  @Output() readonly eliminarSolicitado = new EventEmitter<number>();
  @Output() readonly editarSolicitado = new EventEmitter<Tarea>();

  obtenerColorPrioridad(): 'danger' | 'warning' | 'success' {
    switch (this.tarea.prioridad) {
      case 'Alta':
        return 'danger';
      case 'Baja':
        return 'success';
      default:
        return 'warning';
    }
  }

  solicitarEliminacion(): void {
    this.eliminarSolicitado.emit(this.tarea.id);
  }
}
