import * as HTTP from '../protocols/request'
import { WeatherApiResponse } from '../protocols/weather-api-reponse'
import { Weather } from '../protocols/weather'

export class WeatherAdapter implements Weather {
  readonly weatherUrl = 'https://api.openweathermap.org/data/2.5'
  readonly weatherUnits = 'metric'
  readonly weatherApiKey = 'fd08c6e43db7dfc8c6d9141d71b996e3'

  constructor(protected request = new HTTP.Request()) {}

  public async getTemp(city: string): Promise<number> {
    try {
      const response = await this.request.get<WeatherApiResponse>(
        `${this.weatherUrl}/weather?q=${city}&units=${this.weatherUnits}&appid=${this.weatherApiKey}`
      )

      return response.data.main.temp
    } catch (error) {
      console.error(error)
    }
  }
}
