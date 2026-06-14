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

## LSP - Liskov Substitution Principle

### Antes
El módulo de vehículos obligaba al cliente a distinguir cada marca mediante validaciones
concretas. `VehicleManager` dependía de `instanceof` para decidir cómo imprimir los
detalles de `Tesla`, `Audi`, `Toyota`, `Honda` y `Ford`, por lo que las implementaciones
no podían sustituirse libremente bajo un mismo contrato.

### Cambio realizado
Se definió un contrato común mediante la clase abstracta `Vehicle`, encargada de
representar el comportamiento esperado por el sistema. Cada vehículo pasó a implementar
el método `getDetails()`, de modo que la lógica específica de cada marca quedó dentro
de su propia clase y no en el gestor.

### Después
Las implementaciones pueden sustituirse sin alterar el funcionamiento del sistema.
`VehicleManager` ahora trabaja contra el contrato `Vehicle` y puede procesar cualquier
vehículo derivado sin conocer su tipo concreto. Esto respeta el principio de sustitución,
simplifica el flujo del cliente y hace más mantenible la jerarquía.

## ISP - Interface Segregation Principle

### Antes
El catálogo de aves utilizaba una interfaz demasiado grande.
Todas las aves debían implementar `eat()`, `fly()` y `swim()`, incluso cuando alguna
de esas capacidades no correspondía a su comportamiento real. Eso forzaba métodos vacíos
o excepciones en clases como `Toucan`, `Hummingbird` y `Ostrich`.

### Cambio realizado
La interfaz original se dividió en contratos más pequeños y específicos:
`EaterBird`, `FlyingBird` y `SwimmingBird`. Cada clase ahora implementa únicamente
las capacidades que necesita y `BirdCatalog` trabaja con listas separadas según el
comportamiento que quiere ejecutar.

### Después
Las interfaces quedaron más precisas y cada módulo depende solo de lo que realmente usa.
Las aves ya no implementan métodos innecesarios, se evita comportamiento artificial
y el diseño queda preparado para agregar nuevas especies respetando sus capacidades reales.

## DIP - Dependency Inversion Principle

### Antes
El servicio de publicaciones dependía directamente de una implementación concreta.
`PostService` creaba internamente una instancia de `LocalDatabaseService`, por lo que
el módulo de alto nivel quedaba atado al detalle técnico de una fuente específica de datos.

### Cambio realizado
Se introdujo la abstracción `PostProvider` para representar el contrato de obtención de posts.
`PostService` ahora recibe esa dependencia desde afuera por constructor y trabaja solo contra
la interfaz. Tanto `LocalDatabaseService` como `JsonDatabaseService` implementan ese contrato.

### Después
El módulo principal quedó desacoplado de las implementaciones concretas.
`PostService` depende de una abstracción y puede operar con cualquier proveedor compatible
sin modificar su lógica interna. Esto reduce el acoplamiento y facilita cambiar la fuente
de datos sin reabrir el servicio.
