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

  test('Should create an stats', async () => {
    const sut = makeSut()
    await sut.saveStats('any_city')
    const count = await statsCollection.countDocuments()
    expect(count).toBe(1)
  })

  test('Should return all stats in collection', async () => {
    const sut = makeSut()
    const date = new Date()
    await statsCollection.insertOne({
      city: {
        name: 'any_city',
        date: date
      }
    })

    const stats = await sut.getStats()
    expect(stats).toBeTruthy()
    expect(stats[0].city.name).toEqual('any_city')
    expect(stats[0].city.date).toEqual(date)
  })
})
