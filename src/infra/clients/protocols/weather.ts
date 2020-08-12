export interface Weather {
  getTemp(city: string): Promise<number>
}
