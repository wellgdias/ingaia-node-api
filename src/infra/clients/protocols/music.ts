export interface Music {
  getPlaylist(temp: number): Promise<string[]>
}
