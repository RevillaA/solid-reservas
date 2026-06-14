/**
 * Los contratos se separan por capacidad para que cada ave implemente
 * solo el comportamiento que realmente necesita.
 */
interface EaterBird {
    eat(): void;
}

interface FlyingBird {
    fly(): void;
}

interface SwimmingBird {
    swim(): void;
}

export class Toucan implements EaterBird, FlyingBird {
    public eat() { console.log('El Tucan esta comiendo frutas.'); }
    public fly() { console.log('El Tucan vuela sobre la selva.'); }
}

export class Hummingbird implements EaterBird, FlyingBird {
    public eat() { console.log('El Colibri busca nectar.'); }
    public fly() { console.log('El Colibri aletea rapidamente.'); }
}

export class Ostrich implements EaterBird, SwimmingBird {
    public eat() { console.log('El Avestruz come hierbas.'); }
    public swim() { console.log('El Avestruz puede nadar si es necesario.'); }
}

export class BirdCatalog {

    // Cada flujo depende solo del contrato que realmente utiliza.
    static showEating(birds: EaterBird[]) {
        birds.forEach(bird => bird.eat());
    }

    static showFlying(birds: FlyingBird[]) {
        birds.forEach(bird => bird.fly());
    }

    static showSwimming(birds: SwimmingBird[]) {
        birds.forEach(bird => bird.swim());
    }

}
