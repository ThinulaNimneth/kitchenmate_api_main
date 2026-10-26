export class AppError extends Error{
    statusCode: number
    details?: unknown
    code?: string


    constructor(statusCode: number, message: string, options?: { details?: unknown; code?: string}) {
        super(message)
        this.statusCode = statusCode
        this.details = options?.details
        this.code = options?.code
        Object.setPrototypeOf(this, AppError.prototype)

    }
}