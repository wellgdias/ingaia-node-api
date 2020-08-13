import { MusicController } from '../../presentation/controllers/music-controller'
import { Controller } from '../../presentation/protocols/controller'
import { WeatherAdapter } from '../../infra/clients/weather-adapter/weather-api-adapter'
import { MusicAdapter } from '../../infra/clients/music-adapter/music-api-adapter'
import { StatsMongoRepository } from '../../infra/db/mongodb/log/stats-mongodb-repository'
import { StatsControllerDecorator } from '../decorators/stats-controller-decorator'

export const makeMusicController = (): Controller => {
  const weatherAdapter = new WeatherAdapter()
  const musicAdapter = new MusicAdapter()
  const musicController = new MusicController(weatherAdapter, musicAdapter)

  const statsMongoRepository = new StatsMongoRepository()
  return new StatsControllerDecorator(musicController, statsMongoRepository)
}
