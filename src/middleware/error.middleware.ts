import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { ZodError } from "zod"
import { AppError } from "../utils/AppError"

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(404, `Route not found: ${req.method} ${req.originalUrl}`))
}

export const errorHandler = (err: unknown,_req: Request, res: Response,  _next: NextFunction) => {
  let status = 500
  let message = "Something went wrong on the server"

  if (err instanceof AppError) {
    status = err.statusCode
    message = err.message
  } else if (err instanceof ZodError) {
    status = 400
    message = err.issues[0]?.message ?? "Validation failed"
  } else if (err instanceof mongoose.Error.ValidationError) {
    status = 400
    message = Object.values(err.errors)[0]?.message ?? "Validation failed"
  } else if (err instanceof mongoose.Error.CastError) {
    status = 400
    message = `Invalid value for ${err.path}`
  } else if (err instanceof jwt.TokenExpiredError) {
    status = 401
    message = "Token expired"
  } else if (err instanceof jwt.JsonWebTokenError) {
    status = 401
    message = "Invalid token"
  } else if (err instanceof SyntaxError) {
    status = 400
    message = "Invalid JSON body"
  }

  if (status === 500) {
    console.error(err)
  }

  res.status(status).json({ success: false, message })
}