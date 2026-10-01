import { TestBed } from '@angular/core/testing';
import { TareaService } from './tarea.service';
import { Tarea } from '../models/tarea.interface';

describe('TareaService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [TareaService] });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    localStorage.clear();
  });

  it('crea tareas con id y estado inicial, y las guarda en localStorage', () => {
    const servicio = TestBed.inject(TareaService);
    const tarea = servicio.agregarTarea({
      titulo: 'Entregar ensayo',
      descripcion: 'Historia contemporánea',
      prioridad: 'Alta',
    });

    expect(tarea).toEqual({
      id: 1,
      titulo: 'Entregar ensayo',
      descripcion: 'Historia contemporánea',
      prioridad: 'Alta',
      completada: false,
    });
    expect(JSON.parse(localStorage.getItem('taskapp_tareas') ?? '[]')).toEqual([tarea]);
  });

  it('persiste los cambios de estado y eliminación', () => {
    const servicio = TestBed.inject(TareaService);
    const tarea = servicio.agregarTarea({
      titulo: 'Preparar exposición',
      descripcion: 'Repasar las diapositivas',
      prioridad: 'Media',
    });

    servicio.alternarCompletada(tarea.id);
    expect((JSON.parse(localStorage.getItem('taskapp_tareas') ?? '[]') as Tarea[])[0].completada)
      .toBe(true);

    servicio.eliminarTarea(tarea.id);
    expect(servicio.obtenerTareas()).toEqual([]);
    expect(JSON.parse(localStorage.getItem('taskapp_tareas') ?? '[]')).toEqual([]);
  });

  it('tolera datos corruptos almacenados', () => {
    localStorage.setItem('taskapp_tareas', '{');
    expect(TestBed.inject(TareaService).obtenerTareas()).toEqual([]);
  });

  it('recupera las tareas guardadas al iniciar el servicio', () => {
    const tarea: Tarea = {
      id: 4,
      titulo: 'Repasar apuntes',
      descripcion: 'Capítulos tres y cuatro',
      prioridad: 'Baja',
      completada: true,
    };
    localStorage.setItem('taskapp_tareas', JSON.stringify([tarea]));

    expect(TestBed.inject(TareaService).obtenerTareas()).toEqual([tarea]);
  });
});