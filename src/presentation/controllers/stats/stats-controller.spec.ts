import { StatsController } from './stats-controller'
import { StatsRepository } from '../../../infra/db/mongodb/protocols/stats-repository'
import { StatsModel } from '../../../infra/db/mongodb/protocols/stats'
import { HttpRequest } from '../../protocols/http'
import { ok, serverError } from '../../helpers/http-helper'

const date = new Date()
const makeFakeRequest = (): HttpRequest => ({
  params: ''
})

const makeStatsRepository = (): StatsRepository => {
  class StatsRepositoryStub implements StatsRepository {
    async saveStats(city: string): Promise<void> {
      return new Promise((resolve) => resolve())
    }

    async getStats(): Promise<StatsModel[]> {
      return new Promise((resolve) =>
        resolve([
          {
            id: 'any_id',
            city: {
              name: 'any_city',
              date: date
            }
          }
        ])
      )
    }
  }

  return new StatsRepositoryStub()
}

interface SutTypes {
  sut: StatsController
  statsRepositoryStub: StatsRepository
}

const makeSut = (): SutTypes => {
  const statsRepositoryStub = makeStatsRepository()
  const sut = new StatsController(statsRepositoryStub)
  return {
    sut,
    statsRepositoryStub
  }
}

describe('Stats Controller', () => {
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toStrictEqual(
      ok([
        {
          id: 'any_id',
          city: {
            name: 'any_city',
            date: date
          }
        }
      ])
    )
  })

  test('Should return 500 if StatsRepository throws', async () => {
    const { sut, statsRepositoryStub } = makeSut()
    jest
      .spyOn(statsRepositoryStub, 'getStats')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
