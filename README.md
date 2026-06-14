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

## OCP - Open/Closed Principle

### Antes
Los servicios que consultaban recursos remotos repetían la misma lógica de acceso HTTP.
`NewsService` y `PhotosService` resolvían directamente la consulta con `fetch`,
por lo que agregar un nuevo recurso o ajustar el comportamiento común implicaba
modificar clases existentes y duplicar implementación.

### Cambio realizado
Se extrajo la lógica común de consulta a una abstracción base llamada
`ApiResourceService`. A partir de esa base, `NewsService` y `PhotosService`
quedaron como especializaciones que solo definen su recurso y su caso de uso,
sin reescribir la mecánica compartida.

### Después
El código quedó abierto a extensión y cerrado a modificación.
Ahora es posible agregar nuevos servicios de recursos remotos creando otra clase
que extienda `ApiResourceService`, sin tener que reabrir ni alterar la lógica
principal ya existente. Eso mejora la escalabilidad del módulo y evita cambios
innecesarios en código estable.
