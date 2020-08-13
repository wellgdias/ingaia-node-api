import SpotifyWebApi from 'spotify-web-api-node'
import config from '../../../main/config/env'
import { Music } from '../protocols/music'

enum PlaylistId {
  pop = '37i9dQZF1DX1ngEVM0lKrb',
  rock = '37i9dQZF1DWXRqgorJj26U',
  classic = '37i9dQZF1DWWEJlAGA9gs0'
}

export class MusicAdapter implements Music {
  public async getPlaylist(temp: number): Promise<string[]> {
    const spotifyWebApi = new SpotifyWebApi({
      clientId: config.spotifyApi.clientId,
      clientSecret: config.spotifyApi.clientSecret
    })

    const credentials = await spotifyWebApi.clientCredentialsGrant()
    const accessToken = credentials.body.access_token
    spotifyWebApi.setAccessToken(accessToken)

    const playlistId =
      temp > 25
        ? PlaylistId.pop
        : temp >= 10 && temp <= 25
          ? PlaylistId.rock
          : PlaylistId.classic

    const response = await spotifyWebApi.getPlaylistTracks(playlistId)

    return response.body.items.map((item) => {
      const artists = item.track.album.artists.map((artist) => artist.name)
      return `${item.track.album.name} - ${artists[0]}`
    })
  }
}
