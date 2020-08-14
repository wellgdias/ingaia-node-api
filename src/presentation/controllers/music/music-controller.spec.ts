import { MusicController } from './music-controller'
import { HttpRequest } from '../../protocols/http'
import { Weather } from '../../../infra/clients/protocols/weather'
import { ok, serverError, notFound } from '../../helpers/http-helper'
import { Music } from '../../../infra/clients/protocols/music'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    city: 'Itu'
  }
})

const makeWeather = (): Weather => {
  class WeatherStub implements Weather {
    async getTemp(city: string): Promise<number> {
      return new Promise((resolve) => resolve(25))
    }
  }
  return new WeatherStub()
}

const makeMusic = (): Music => {
  class MusicStub implements Music {
    async getPlaylist(temp: number): Promise<string[]> {
      return new Promise((resolve) =>
        resolve(['any_music', 'any_music', 'any_music'])
      )
    }
  }
  return new MusicStub()
}

interface SutTypes {
  sut: MusicController
  weatherStub: Weather
  musicStub: Music
}

const makeSut = (): SutTypes => {
  const weatherStub = makeWeather()
  const musicStub = makeMusic()
  const sut = new MusicController(weatherStub, musicStub)
  return {
    sut,
    weatherStub,
    musicStub
  }
}

describe('Music Controller', () => {
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toStrictEqual(
      ok(['any_music', 'any_music', 'any_music'])
    )
  })

  test('should call Weather with correct city ', async () => {
    const { sut, weatherStub } = makeSut()
    const tempSpy = jest.spyOn(weatherStub, 'getTemp')
    await sut.handle(makeFakeRequest())
    expect(tempSpy).toHaveBeenCalledWith('Itu')
  })

  test('Should return 500 if Weather throws', async () => {
    const { sut, weatherStub } = makeSut()
    jest
      .spyOn(weatherStub, 'getTemp')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 404 on calls Weather with incorrect city ', async () => {
    const { sut, weatherStub } = makeSut()
    jest.spyOn(weatherStub, 'getTemp').mockRejectedValue({
      response: {
        status: 404,
        data: {
          cod: '404',
          message: 'city not found'
        }
      }
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(
      notFound({
        cod: '404',
        message: 'city not found'
      })
    )
  })

  test('should call Music with temp ', async () => {
    const { sut, musicStub } = makeSut()
    const tempSpy = jest.spyOn(musicStub, 'getPlaylist')
    await sut.handle(makeFakeRequest())
    expect(tempSpy).toHaveBeenCalledWith(25)
  })

  test('Should return 500 if Weather throws', async () => {
    const { sut, musicStub } = makeSut()
    jest
      .spyOn(musicStub, 'getPlaylist')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
