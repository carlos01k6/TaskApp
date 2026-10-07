# TaskApp

Aplicación móvil híbrida para organizar tareas académicas por prioridad, marcar entregas completadas y conservar la agenda localmente.

## Requisitos previos

- Node.js LTS
- npm
- Ionic CLI: `npm install -g @ionic/cli`
- Para Android: Android Studio con Android SDK y un emulador configurado, o un dispositivo Android con depuración USB.

## Ejecutar en web

```bash
git clone https://github.com/carlos01k6/TaskApp.git taskapp
cd taskapp
npm install
ionic serve
```

Ionic sirve la versión web adaptable en el navegador, normalmente en `http://localhost:8100`.

## Ejecutar en Android

El proyecto Android de Capacitor está en `android/`. Para generar y abrir la app en Android Studio:

```bash
npm install
npm run build
npx cap sync android
npx cap open android
```

En Android Studio, selecciona un emulador o conecta un dispositivo Android y pulsa **Run**. También puedes ejecutarla desde la terminal con `npx cap run android` si ya hay un dispositivo o emulador disponible. Después de modificar la app web, repite `npm run build` y `npx cap sync android` para copiar los cambios al proyecto nativo.

La carpeta Android contiene el contenedor nativo; para compilarlo o instalarlo se necesita Android Studio/SDK. `ionic serve` por sí solo ejecuta la versión web, no instala una app en el teléfono.

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
- [x] Formulario modal reactivo para crear y editar tareas, con validación.
- [x] Marcar tareas como completadas, con texto tachado y opacidad reducida.
- [x] Eliminar desde el botón o deslizando el elemento, con confirmación.
- [x] Actualización reactiva mediante `BehaviorSubject` y persistencia en `localStorage`.
- [x] Modelo compartido y comunicación padre-hijo con `@Input()` y `@Output()`.
- [x] Lista optimizada mediante `trackBy` y resumen de tareas completadas en el pie.

## Tecnologías

- Ionic 9 y Angular 22 con TypeScript estricto.
- Formularios reactivos de Angular.
- RxJS `BehaviorSubject` y almacenamiento del navegador (`localStorage`).
- Capacitor 8 y plataforma Android para empaquetar la misma interfaz web como aplicación móvil híbrida.

## Documentación de la práctica

- [Guía paso a paso en PDF](docs/paso-a-paso-taskapp.pdf)
- [Fuente HTML de la guía](docs/paso-a-paso-taskapp.html)

## Entregables

- **Código fuente:** [Repositorio TaskApp en GitHub](https://github.com/carlos01k6/TaskApp).
- **Dependencias:** `node_modules/` no se incluye en el repositorio; está excluido por `.gitignore` y se recupera ejecutando `npm install`.
- **Ejecución de desarrollo web:** instalar Ionic CLI con `npm install -g @ionic/cli` y ejecutar `ionic serve`.
- **Aplicación Android:** el proyecto nativo está en `android/`; requiere Android Studio y Android SDK. Consulta la sección anterior para compilar y abrir la app.
- **Paso a paso:** el PDF está disponible en `docs/paso-a-paso-taskapp.pdf`.
