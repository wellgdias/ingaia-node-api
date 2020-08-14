import { Controller } from '../../presentation/protocols/controller'
import { StatsControllerDecorator } from './stats-controller-decorator'
import { HttpRequest, HttpResponse } from '../../presentation/protocols/http'
import { StatsModel } from '../../infra/db/mongodb/protocols/stats'
import { ok } from '../../presentation/helpers/http-helper'
import { StatsRepository } from '../../infra/db/mongodb/protocols/stats-repository'

const date = new Date()
const makeFakeRequest = (): HttpRequest => ({
  params: ''
})

const makeFakeResponse = (): StatsModel[] => {
  return [
    {
      id: 'any_id',
      city: {
        name: 'any_city',
        date: date
      }
    }
  ]
}

const makeStatsRepository = (): StatsRepository => {
  class StatsRepositoryStub implements StatsRepository {
    async saveStats(city: string): Promise<void> {
      return new Promise((resolve) => resolve())
    }

    async getStats(): Promise<StatsModel[]> {
      return new Promise((resolve) => resolve(makeFakeResponse()))
    }
  }

  return new StatsRepositoryStub()
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise((resolve) => resolve(ok(makeFakeResponse())))
    }
  }
  return new ControllerStub()
}

interface SutTypes {
  sut: StatsControllerDecorator
  controllerStub: Controller
  statsRepositoryStub: StatsRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const statsRepositoryStub = makeStatsRepository()
  const sut = new StatsControllerDecorator(controllerStub, statsRepositoryStub)
  return {
    sut,
    controllerStub,
    statsRepositoryStub
  }
}

describe('StatsController Decorator', () => {
  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(ok(makeFakeResponse()))
  })
})
