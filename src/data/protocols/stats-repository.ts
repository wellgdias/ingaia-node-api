export interface StatsRepository {
  saveStats(city: string): Promise<void>
}
