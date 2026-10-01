import { TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';
import { TareaFormComponent } from './tarea-form.component';

describe('TareaFormComponent', () => {
  it('valida el título mínimo y la descripción obligatoria', async () => {
    await TestBed.configureTestingModule({
      imports: [TareaFormComponent],
      providers: [provideIonicAngular()],
    }).compileComponents();

    const fixture = TestBed.createComponent(TareaFormComponent);
    const formulario = fixture.componentInstance.formulario;

    expect(formulario.invalid).toBe(true);
    formulario.controls.titulo.setValue('Corto');
    expect(formulario.controls.titulo.hasError('minlength')).toBe(false);
    expect(formulario.controls.descripcion.hasError('required')).toBe(true);

    formulario.controls.titulo.setValue('ABC');
    expect(formulario.controls.titulo.hasError('minlength')).toBe(true);
    expect(formulario.invalid).toBe(true);
  });

  it('precarga los datos recibidos al editar una tarea', async () => {
    await TestBed.configureTestingModule({
      imports: [TareaFormComponent],
      providers: [provideIonicAngular()],
    }).compileComponents();

    const fixture = TestBed.createComponent(TareaFormComponent);
    fixture.componentRef.setInput('tarea', {
      id: 7,
      titulo: 'Leer capítulo cinco',
      descripcion: 'Preparar un resumen',
      prioridad: 'Alta',
      completada: true,
    });
    fixture.detectChanges();

    expect(fixture.componentInstance.estaEditando).toBe(true);
    expect(fixture.componentInstance.formulario.getRawValue()).toEqual({
      titulo: 'Leer capítulo cinco',
      descripcion: 'Preparar un resumen',
      prioridad: 'Alta',
    });
  });
});