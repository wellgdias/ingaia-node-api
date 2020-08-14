import { Router } from 'express'
import { adapterRoute } from '../adapters/express-route-adapter'
import { makeMusicController } from '../factories/music-factory'
import { makeStatsController } from '../factories/stats-factory'

export default (router: Router): void => {
  router.get('/music/:city', adapterRoute(makeMusicController()))
  router.get('/stats', adapterRoute(makeStatsController()))
}
