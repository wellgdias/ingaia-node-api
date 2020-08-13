import { MusicAdapter } from './music-api-adapter'
import pop from './mock/pop.json'
import rock from './mock/rock.json'
import classic from './mock/classic.json'

const makeSut = (): MusicAdapter => {
  return new MusicAdapter()
}

describe('MusicAdapter', () => {
  test('Should return a playlist pop on call the MusicAdapter', async () => {
    const temp = 26
    const sut = makeSut()
    const response = await sut.getPlaylist(temp)
    expect(response).toEqual(pop)
  })

  test('Should return a playlist rock on call the MusicAdapter', async () => {
    const temp = 25
    const sut = makeSut()
    const response = await sut.getPlaylist(temp)
    expect(response).toEqual(rock)
  })

  test('Should return a playlist rock on call the MusicAdapter', async () => {
    const temp = 9
    const sut = makeSut()
    const response = await sut.getPlaylist(temp)
    expect(response).toEqual(classic)
  })
})
