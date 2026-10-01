import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlertController,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonList,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, bookOutline, checkmarkDoneOutline, clipboardOutline, trashOutline } from 'ionicons/icons';
import { TareaFormComponent } from '../components/tarea-form/tarea-form.component';
import { TareaItemComponent } from '../components/tarea-item/tarea-item.component';
import { DatosNuevaTarea, Tarea } from '../models/tarea.interface';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonFab,
    IonFabButton,
    IonFooter,
    IonHeader,
    IonIcon,
    IonList,
    IonTitle,
    IonToolbar,
    TareaItemComponent,
  ],
})
export class HomePage {
  private readonly tareaService = inject(TareaService);
  private readonly modalController = inject(ModalController);
  private readonly alertController = inject(AlertController);
  readonly tareas$ = this.tareaService.tareas$;

  constructor() {
    addIcons({ add, bookOutline, checkmarkDoneOutline, clipboardOutline, trashOutline });
  }

  contarCompletadas(tareas: Tarea[]): number {
    return tareas.filter((tarea) => tarea.completada).length;
  }

  alternarTarea(id: number): void {
    this.tareaService.alternarCompletada(id);
  }

  async abrirFormulario(): Promise<void> {
    const modal = await this.modalController.create({
      component: TareaFormComponent,
      cssClass: 'task-form-modal',
      breakpoints: [0, 0.88, 1],
      initialBreakpoint: 0.88,
      handle: true,
    });
    const resultado = modal.onWillDismiss<DatosNuevaTarea>();
    await modal.present();

    const { data, role } = await resultado;
    if (role === 'confirm' && data) {
      this.tareaService.agregarTarea(data);
    }
  }

  async eliminarTarea(id: number): Promise<void> {
    const alerta = await this.alertController.create({
      header: '¿Eliminar tarea?',
      message: 'La tarea se eliminará de forma permanente.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.tareaService.eliminarTarea(id),
        },
      ],
    });
    await alerta.present();
  }

}
