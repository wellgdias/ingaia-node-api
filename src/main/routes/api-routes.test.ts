import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let accountcollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountcollection = await MongoHelper.getCollection('stats')
    await accountcollection.deleteMany({})
  })

  describe('GET /music/:city', () => {
    test('Should return 200 on call music', async () => {
      const city = 'Itu'
      await request(app).get(`/api/v1/music/${city}`).expect(200)
    })
  })

  describe('GET /stats', () => {
    test('Should return 200 on call stats', async () => {
      await request(app).get('/api/v1/stats').expect(200)
    })
  })
})
