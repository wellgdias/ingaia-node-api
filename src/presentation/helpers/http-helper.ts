import { HttpResponse } from '../protocols/http'
import { ServerError } from '../errors/server-error'

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.message)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const notFound = (data: any): HttpResponse => ({
  statusCode: 404,
  body: data
})
