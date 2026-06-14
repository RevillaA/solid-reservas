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

### Reflexión
Si mañana la reserva decide notificar por WhatsApp en lugar de Email, antes habría sido necesario
modificar directamente `ProductBloc`, porque la lógica de notificación estaba mezclada con la gestión
de productos. En el diseño actual, el cambio queda concentrado en `CustomerNotifier`, ya que `ProductBloc`
sigue cumpliendo solo el rol de coordinación. En términos prácticos, se pasa de intervenir una clase
que mezclaba responsabilidades de negocio e infraestructura a intervenir únicamente la clase encargada
del canal de comunicación. La refactorización no elimina por completo el cambio, pero sí lo aísla en el
lugar correcto.

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

### Reflexión
En esta implementación, la mejora de OCP no se orientó a una migración de `axios` hacia `fetch`,
sino a evitar que la lógica común de consumo HTTP se repitiera en cada servicio. Por eso, si se
detectara una vulnerabilidad en la mecánica compartida de acceso remoto, el ajuste sería más rápido
que antes: bastaría intervenir la base `ApiResourceService` en lugar de reescribir cada servicio por
separado. Aunque el proyecto actual ya trabaja con `fetch`, la reflexión válida es que el diseño
centraliza el comportamiento reutilizable y reduce la cantidad de puntos a modificar cuando una decisión
técnica transversal cambia con urgencia.

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

### Reflexión
Si la reserva adquiere un `Dron`, el `VehicleManager` podría procesarlo sin agregar nuevos
`if` o `else`, siempre que esa nueva clase respete el contrato definido por `Vehicle` e
implemente `getDetails()`. Antes de la refactorización, el gestor dependía de reconocer cada
marca de forma explícita, así que cualquier incorporación obligaba a modificar el flujo central.
Ahora la extensión ocurre por sustitución: el manager no necesita saber qué tipo concreto recibe,
solo necesita confiar en el comportamiento prometido por la abstracción común.

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

### Reflexión
Con el diseño actual, un `Pingüino` no tendría por qué declarar un método `fly()` que lance
errores, porque ya no existe una interfaz general que obligue a todas las aves a volar. En su
lugar, la clase solo implementaría los contratos que realmente le correspondan, por ejemplo
`EaterBird` y `SwimmingBird`. La diferencia crítica respecto al diseño anterior es que el modelo
deja de forzar comportamientos falsos y pasa a describir capacidades reales, lo que evita código
defensivo y excepciones artificiales.

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

### Reflexión
Inyectar un `MockDatabase` para pruebas unitarias ahora es mucho más directo, porque `PostService`
ya no crea su dependencia internamente. Basta con proporcionar una clase u objeto que implemente
`PostProvider` y devuelva los datos controlados por la prueba. Antes, esa sustitución era incómoda
porque el servicio estaba acoplado a `LocalDatabaseService` y no ofrecía un punto de entrada para
reemplazarlo. Después de la refactorización, la prueba puede centrarse en el comportamiento de
`PostService` sin depender de una fuente real de datos.
