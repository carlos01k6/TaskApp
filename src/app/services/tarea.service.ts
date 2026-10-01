import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatosNuevaTarea, Prioridad, Tarea } from '../models/tarea.interface';

const CLAVE_ALMACENAMIENTO = 'taskapp_tareas';

@Injectable({ providedIn: 'root' })
export class TareaService {
  private readonly tareasSubject = new BehaviorSubject<Tarea[]>(this.cargarTareas());
  readonly tareas$ = this.tareasSubject.asObservable();

  obtenerTareas(): Tarea[] {
    return [...this.tareasSubject.value];
  }

  agregarTarea(datos: DatosNuevaTarea): Tarea {
    const siguienteId = this.tareasSubject.value.reduce(
      (maximo, tarea) => Math.max(maximo, tarea.id),
      0,
    ) + 1;
    const nuevaTarea: Tarea = { ...datos, id: siguienteId, completada: false };
    this.actualizarTareas([...this.tareasSubject.value, nuevaTarea]);
    return nuevaTarea;
  }

  alternarCompletada(id: number): void {
    this.actualizarTareas(
      this.tareasSubject.value.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea,
      ),
    );
  }

  eliminarTarea(id: number): void {
    this.actualizarTareas(this.tareasSubject.value.filter((tarea) => tarea.id !== id));
  }

  private cargarTareas(): Tarea[] {
    try {
      const contenido = localStorage.getItem(CLAVE_ALMACENAMIENTO);
      if (!contenido) {
        return [];
      }

      const tareas: unknown = JSON.parse(contenido);
      return Array.isArray(tareas) ? tareas.filter((tarea) => this.esTarea(tarea)) : [];
    } catch {
      return [];
    }
  }

  private esTarea(valor: unknown): valor is Tarea {
    if (typeof valor !== 'object' || valor === null) {
      return false;
    }

    const tarea = valor as Partial<Tarea>;
    return (
      typeof tarea.id === 'number' &&
      typeof tarea.titulo === 'string' &&
      typeof tarea.descripcion === 'string' &&
      this.esPrioridad(tarea.prioridad) &&
      typeof tarea.completada === 'boolean'
    );
  }

  private esPrioridad(prioridad: unknown): prioridad is Prioridad {
    return prioridad === 'Alta' || prioridad === 'Media' || prioridad === 'Baja';
  }

  private actualizarTareas(tareas: Tarea[]): void {
    this.tareasSubject.next(tareas);
    try {
      localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(tareas));
    } catch {
      // La vista sigue funcionando aunque el navegador no permita guardar datos.
    }
  }
}
