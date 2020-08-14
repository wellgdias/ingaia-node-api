import { StatsController } from '../../presentation/controllers/stats/stats-controller'
import { StatsMongoRepository } from '../../infra/db/mongodb/stats/stats-mongodb-repository'
import { Controller } from '../../presentation/protocols/controller'

export const makeStatsController = (): Controller => {
  const statsMongoRepository = new StatsMongoRepository()
  return new StatsController(statsMongoRepository)
}
