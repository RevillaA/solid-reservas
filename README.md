# Proyecto para practicar

Este es un proyecto de Vanilla TypeScript en Vite, para trabajar los ejercicios sobre Principios SOLID y CleanCode.

Clonar o descargar el proyecto y luego:

```bash
npm install
```

Para ejecutar el proyecto, simplemente ejecuten

```bash
npm run dev
```

## SRP - Single Responsibility Principle

### Antes
El módulo de productos concentraba varias responsabilidades dentro de una misma clase.
`ProductBloc` se encargaba de coordinar el flujo principal, guardar productos y también
enviar notificaciones al cliente. Esa mezcla hacía que un cambio en persistencia o en
comunicación afectara directamente al mismo componente.

### Cambio realizado
Se separaron las responsabilidades en clases más específicas.
La gestión de almacenamiento pasó a `ProductRepository`, la notificación al cliente
se movió a `CustomerNotifier` y `ProductBloc` quedó únicamente como coordinador del
caso de uso.

### Después
Cada clase tiene una responsabilidad más clara y limitada.
`ProductBloc` orquesta el proceso, `ProductRepository` administra los productos y
`CustomerNotifier` encapsula el envío de mensajes. Esto mejora la legibilidad,
reduce el acoplamiento y facilita el mantenimiento del módulo.
