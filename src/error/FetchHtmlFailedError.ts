import { ApplicationError } from ".";

export class FetchHtmlFailedError extends ApplicationError {
    constructor(message?: string) {
        super(message || 'Failed to fetch PDDIKTI HTML', 502)
    }
}