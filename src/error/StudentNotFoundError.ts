import { ApplicationError } from ".";

export class StudentNotFoundError extends ApplicationError {
    constructor(message?: string) {
        super(message || 'No student found', 404)
    }
}