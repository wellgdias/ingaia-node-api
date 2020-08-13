import * as HTTP from '../protocols/request'
import { WeatherApiResponse } from '../protocols/weather-api-reponse'
import { Weather } from '../protocols/weather'
import config from '../../../main/config/env'

export class WeatherAdapter implements Weather {
  readonly weatherUnits = 'metric'

  constructor(protected request = new HTTP.Request()) {}

  public async getTemp(city: string): Promise<number> {
    const response = await this.request.get<WeatherApiResponse>(
      `${config.weatherApi.Url}/weather?q=${city}&units=${this.weatherUnits}&appid=${config.weatherApi.Key}`
    )
    return response.data.main.temp
  }
}
