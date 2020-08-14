import { HttpResponse, HttpRequest } from '../../protocols/http'
import { serverError, ok, notFound } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { Weather } from '../../../infra/clients/protocols/weather'
import { Music } from '../../../infra/clients/protocols/music'

export class MusicController implements Controller {
  constructor(
    private readonly wather: Weather,
    private readonly music: Music
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { city } = httpRequest.params
      const temp = await this.wather.getTemp(city)
      const tracks = await this.music.getPlaylist(temp)
      return ok(tracks)
    } catch (error) {
      if (error?.response?.status === 404) {
        return notFound(error.response.data)
      }
      return serverError(error)
    }
  }
}
