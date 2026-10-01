# TaskApp

Aplicación móvil híbrida para organizar tareas académicas por prioridad, marcar entregas completadas y conservar la agenda localmente.

## Requisitos previos

- Node.js LTS
- npm
- Ionic CLI: `npm install -g @ionic/cli`

## Clonar, instalar y ejecutar

```bash
git clone https://github.com/carlos01k6/TaskApp.git
cd taskapp
npm install
ionic serve
```

## Estructura del proyecto

```text
src/app/
  components/
    tarea-form/       Modal con formulario reactivo
    tarea-item/       Elemento de lista con toggle y eliminación
  home/               Página principal y presentación de tareas
  models/             Tipos e interfaces del dominio
  services/           Estado y persistencia local
```

## Funcionalidades

- [x] Inicio con resumen, listado, estado vacío y botón flotante para crear tareas.
- [x] Título, descripción y prioridades Alta, Media o Baja con distintivo de color.
- [x] Formulario modal reactivo con validación y controles para guardar o cancelar.
- [x] Marcar tareas como completadas, con texto tachado y opacidad reducida.
- [x] Eliminar desde el botón o deslizando el elemento, con confirmación.
- [x] Actualización reactiva mediante `BehaviorSubject` y persistencia en `localStorage`.
- [x] Modelo compartido y comunicación padre-hijo con `@Input()` y `@Output()`.
- [x] Lista optimizada mediante `trackBy` y resumen de tareas completadas en el pie.

## Tecnologías

- Ionic 9 y Angular 22 con TypeScript estricto.
- Formularios reactivos de Angular.
- RxJS `BehaviorSubject` y almacenamiento del navegador (`localStorage`).
- Capacitor para la integración móvil híbrida.
