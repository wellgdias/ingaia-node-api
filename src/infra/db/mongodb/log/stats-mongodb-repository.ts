import { StatsRepository } from '../../../../data/protocols/stats-repository'
import { MongoHelper } from '../helpers/mongo-helper'

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
}
