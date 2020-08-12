import { MusicController } from '../../presentation/controllers/music-controller'
import { Controller } from '../../presentation/protocols/controller'
import { WeatherAdapter } from '../../infra/clients/weather-adapter/weather-api-adapter'

export const makeMusicController = (): Controller => {
  const weatherAdapter = new WeatherAdapter()
  return new MusicController(weatherAdapter)
}
