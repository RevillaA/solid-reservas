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
El módulo de productos concentraba varias responsabilidades en una sola clase.
`ProductBloc` no solo coordinaba las operaciones del caso de uso, sino que también
guardaba productos y enviaba notificaciones al cliente. Eso hacía que cualquier cambio
en persistencia o en notificaciones obligara a modificar la misma clase.

### Cambio realizado
Se separó la lógica en componentes con responsabilidades específicas.
La persistencia de productos se movió a `ProductRepository`, la notificación al cliente
se trasladó a `CustomerNotifier` y `ProductBloc` quedó únicamente como punto de
coordinación entre esas piezas.

### Después
Cada módulo tiene una responsabilidad clara y única.
`ProductBloc` orquesta, `ProductRepository` gestiona el almacenamiento y
`CustomerNotifier` encapsula el envío de mensajes. Esto reduce el acoplamiento
y hace más fácil mantener o cambiar una parte sin afectar las demás.

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
