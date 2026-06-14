/**
 * Todos los vehiculos exponen el mismo contrato para que el cliente
 * pueda tratarlos de forma uniforme.
 */
export abstract class Vehicle {

    constructor(public readonly model: string) {}

    // Cada implementacion describe su comportamiento sin exigir validaciones externas.
    abstract getDetails(): string;

}

export class Tesla extends Vehicle {

    getDetails() {
        return `Tesla Model: ${this.model} Carga electrica al 100%`;
    }

}

export class Audi extends Vehicle {

    getDetails() {
        return `Audi Model: ${this.model} Traccion Quattro activada`;
    }

}

export class Toyota extends Vehicle {

    getDetails() {
        return `Toyota Model: ${this.model} Motor hibrido listo`;
    }

}

export class Honda extends Vehicle {

    getDetails() {
        return `Honda Model: ${this.model} VTEC activado`;
    }

}

export class Ford extends Vehicle {

    getDetails() {
        return `Ford Model: ${this.model} Built Tough`;
    }

}

export class VehicleManager {

    // El gestor depende del contrato comun, por eso cualquier Vehicle puede sustituirse sin cambiar este flujo.
    static printVehicleDetails(vehicles: Vehicle[]) {
        vehicles.forEach(vehicle => {
            console.log(vehicle.getDetails());
        });
    }

}
