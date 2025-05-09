import { songResource } from '@/api/resources/SongResource'
import { SongsNotFoundException } from '@/common/domain/SongsNotFoundException'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Mock } from 'vitest'
import { mockSongsData } from '../../fixtures/song.fixture'
import { mockFetch, stubNotFound } from '../../test-utils/backend'

let fetch: Mock
describe('Song Resource', () => {
  beforeEach(() => {
    fetch = mockFetch()
  })
  it('should fail do get songs', () => {
    const promise = Promise.reject(stubNotFound())
    fetch.mockResolvedValue(
      Promise.resolve({
        json: () => promise,
      }),
    )
    const resource = songResource()
    expect(resource.getSongs({ page: 1 })).rejects.toThrow(
      SongsNotFoundException,
    )
  })

  it('should get paginated songs', () => {
    fetch.mockResolvedValue(
      Promise.resolve({
        json: () => mockSongsData(),
      }),
    )
    const resource = songResource()
    expect(resource.getSongs({ page: 1 })).resolves.toEqual({
      pagination: {
        page: 1,
        pageCount: 2,
        pageSize: 2,
        total: 10,
      },
      results: [
        {
          id: 1,
          title: 'Avisa meu mano',
          description: 'Capoeira song mock',
          difficulty: '',
          type: '',
          thumbnail: 'hash.jpeg',
          source: 'hash.mp3',
          lyrics_link: 'hash.lrc',
          translation: 'lyrics_translation_file',
          history:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et turpis purus. Sed tincidunt interdum erat, vitae laoreet neque semper rhoncus. Vestibulum non est ac nulla aliquet varius. Fusce ex tellus, malesuada sed nunc vitae, posuere finibus mi. Quisque suscipit lorem eu nunc placerat fringilla. Nulla quis convallis justo. Duis mattis dolor tincidunt, aliquet felis sollicitudin, malesuada odio. Suspendisse id dui velit. Ut ultrices at massa sed sagittis. Sed metus magna, aliquet at purus id, tempus blandit sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Cras vitae vestibulum nulla. Sed id dui vestibulum, auctor nunc in, vestibulum ante. Nam ut diam cursus, porttitor sapien non, pharetra nisl.',
        },
        {
          id: 2,
          title: 'Avisa meu mano',
          description: 'Capoeira song mock',
          difficulty: '',
          type: '',
          thumbnail: 'hash.jpeg',
          source: 'hash.mp3',
          lyrics_link: 'hash.lrc',
          translation: 'lyrics_translation_file',
          history:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et turpis purus. Sed tincidunt interdum erat, vitae laoreet neque semper rhoncus. Vestibulum non est ac nulla aliquet varius. Fusce ex tellus, malesuada sed nunc vitae, posuere finibus mi. Quisque suscipit lorem eu nunc placerat fringilla. Nulla quis convallis justo. Duis mattis dolor tincidunt, aliquet felis sollicitudin, malesuada odio. Suspendisse id dui velit. Ut ultrices at massa sed sagittis. Sed metus magna, aliquet at purus id, tempus blandit sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Cras vitae vestibulum nulla. Sed id dui vestibulum, auctor nunc in, vestibulum ante. Nam ut diam cursus, porttitor sapien non, pharetra nisl.',
        },
      ],
    })
  })

  it('should get songs with search query', async () => {
    fetch.mockResolvedValue(
      Promise.resolve({
        json: () => mockSongsData(),
      }),
    )
    const resource = songResource()
    await resource.getSongs({ page: 1 }, 'A mant  eiga')
    expect(fetch.mock.calls[0][0]).toContain(
      '/api/songs?pagination%5Bpage%5D=1&filters%5Btitle%5D%5B%24containsi%5D=A%20mant%20%20eiga&populate=%2A',
    )
  })
})
