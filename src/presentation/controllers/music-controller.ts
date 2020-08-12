import { HttpResponse, HttpRequest } from '../protocols/http'
import { serverError, ok } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { Weather } from '../../infra/clients/protocols/weather'

export class MusicController implements Controller {
  constructor(private readonly wather: Weather) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { city } = httpRequest.params
      const temp = await this.wather.getTemp(city)

      return ok({ name: city, temp: temp })
    } catch (error) {
      return serverError(error)
    }
  }
}
