import { StatsRepository } from '../protocols/stats-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { StatsModel } from '../../../../infra/db/mongodb/protocols/stats'

export class StatsMongoRepository implements StatsRepository {
  async saveStats(city: string): Promise<void> {
    const statsCollection = await MongoHelper.getCollection('stats')
    await statsCollection.insertOne({
      city: {
        name: city,
        date: new Date()
      }
    })
  }

  async getStats(): Promise<StatsModel[]> {
    const statsCollection = await MongoHelper.getCollection('stats')
    return await statsCollection.find<StatsModel>().toArray()
  }
}
