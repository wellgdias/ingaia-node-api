import { StatsModel } from './stats'

export interface StatsRepository {
  saveStats(city: string): Promise<void>
  getStats(): Promise<StatsModel[]>
}
