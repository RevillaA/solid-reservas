/**
 * Centraliza el acceso a recursos remotos para extender nuevos servicios
 * sin reescribir la logica comun de consulta.
 */

export abstract class ApiResourceService<TResponse> {

    protected constructor(private readonly resourceUrl: string) {}

    protected async fetchCollection() {
        const response = await fetch(this.resourceUrl);
        return response.json() as Promise<TResponse>;
    }

}
