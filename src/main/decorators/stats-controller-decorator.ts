import { Controller } from '../../presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '../../presentation/protocols/http'
import { StatsRepository } from '../../infra/db/mongodb/protocols/stats-repository'

export class StatsControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly statsRepository: StatsRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    const { city } = httpRequest.params
    if (httpResponse.statusCode === 200) {
      await this.statsRepository.saveStats(city)
    }
    return httpResponse
  }
}
