import { ApplicationError } from ".";

export class ValidationError extends ApplicationError {
    constructor(message?: string) {
        super(message || 'Validation Error', 400)
    }
}