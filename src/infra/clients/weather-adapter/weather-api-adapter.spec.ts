import { WeatherAdapter } from './weather-api-adapter'
import { WeatherApiResponse } from '../protocols/weather-api-reponse'
import * as HTTP from '../protocols/request'

jest.mock('../protocols/request')

const fakeResponse: WeatherApiResponse = {
  coord: {
    lon: -47.3,
    lat: -23.26
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }
  ],
  base: 'stations',
  main: {
    temp: 28.57,
    feels_like: 24.31,
    temp_min: 28.33,
    temp_max: 29,
    pressure: 1014,
    humidity: 23
  },
  visibility: 10000,
  wind: {
    speed: 4.6,
    deg: 360
  },
  clouds: {
    all: 0
  },
  dt: 1597256492,
  sys: {
    type: 1,
    id: 8393,
    country: 'BR',
    sunrise: 1597224993,
    sunset: 1597265516
  },
  timezone: -10800,
  id: 3460535,
  name: 'Itu',
  cod: 200
}

describe('WeatherAdapter', () => {
  const mockedRequest = new HTTP.Request() as jest.Mocked<HTTP.Request>

  test('Should return a temp from the WeatherAdapter', async () => {
    const city = 'any_city'

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    mockedRequest.get.mockResolvedValue({
      data: fakeResponse
    } as HTTP.Response)

    const weatherAdapter = new WeatherAdapter(mockedRequest)
    const temp = await weatherAdapter.getTemp(city)
    expect(temp).toBe(fakeResponse.main.temp)
  })
})
