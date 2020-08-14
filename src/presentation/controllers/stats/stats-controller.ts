import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { StatsRepository } from '../../../data/protocols/stats-repository'
import { ok, serverError } from '../../helpers/http-helper'

export class StatsController implements Controller {
  constructor(private readonly statsRepository: StatsRepository) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const stats = await this.statsRepository.getStats()
      return ok(stats)
    } catch (error) {
      return serverError(error)
    }
  }
}
