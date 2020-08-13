import { MusicController } from '../../presentation/controllers/music-controller'
import { Controller } from '../../presentation/protocols/controller'
import { WeatherAdapter } from '../../infra/clients/weather-adapter/weather-api-adapter'
import { MusicAdapter } from '../../infra/clients/music-adapter/music-api-adapter'

export const makeMusicController = (): Controller => {
  const weatherAdapter = new WeatherAdapter()
  const musicAdapter = new MusicAdapter()
  return new MusicController(weatherAdapter, musicAdapter)
}
