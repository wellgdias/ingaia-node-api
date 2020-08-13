import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { StatsMongoRepository } from './stats-mongodb-repository'

const makeSut = (): StatsMongoRepository => {
  return new StatsMongoRepository()
}

describe('Stats Mongo Repository', () => {
  let statsCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    statsCollection = await MongoHelper.getCollection('stats')
    await statsCollection.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.saveStats('any_city')
    const count = await statsCollection.countDocuments()
    expect(count).toBe(1)
  })
})
