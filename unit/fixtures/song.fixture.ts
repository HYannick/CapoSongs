import type { RestSong, RestSongData } from '@/api/rest/RestSong'
import type { Song } from 'src/domain/Song'

export const mockSong = (opts?: Partial<Song>): Song => ({
  id: 1234,
  thumbnail:
    'https://www.capoeirashop.fr/modules/wpthemeconfigurator/views/img/bd90c8fc4c37b9521d4dce481bc4681cd8883a20_ban-clothing.jpg',
  source: 'song_url.mp3',
  title: 'Avisa meu mano',
  description: 'Capoeira song mock',
  lyrics_link: 'lyrics_link',
  translation: 'lyrics_translation_file',
  history:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et turpis purus. Sed tincidunt interdum erat, vitae laoreet neque semper rhoncus. Vestibulum non est ac nulla aliquet varius. Fusce ex tellus, malesuada sed nunc vitae, posuere finibus mi. Quisque suscipit lorem eu nunc placerat fringilla. Nulla quis convallis justo. Duis mattis dolor tincidunt, aliquet felis sollicitudin, malesuada odio. Suspendisse id dui velit. Ut ultrices at massa sed sagittis. Sed metus magna, aliquet at purus id, tempus blandit sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Cras vitae vestibulum nulla. Sed id dui vestibulum, auctor nunc in, vestibulum ante. Nam ut diam cursus, porttitor sapien non, pharetra nisl.',
  ...opts,
})

export const mockRestSong = (opts?: Partial<RestSong>): RestSong => ({
  id: 1234,
  attributes: {
    title: 'Avisa meu mano',
    description: 'Capoeira song mock',
    difficulty: '',
    type: '',
    thumbnail: {
      data: {
        attributes: {
          formats: {
            thumbnail: {
              hash: 'hash',
              ext: '.jpeg',
              url: 'hash.jpeg',
            },
          },
          hash: 'hash',
          ext: '.jpeg',
          url: 'hash.jpeg',
        },
      },
    },
    source: {
      data: {
        id: 2,
        attributes: {
          hash: 'hash',
          ext: '.mp3',
          url: 'hash.mp3',
        },
      },
    },

    lyrics_link: {
      data: {
        id: 3,
        attributes: {
          hash: 'hash',
          ext: '.lrc',
          url: 'hash.lrc',
        },
      },
    },
    translation: 'lyrics_translation_file',
    history:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et turpis purus. Sed tincidunt interdum erat, vitae laoreet neque semper rhoncus. Vestibulum non est ac nulla aliquet varius. Fusce ex tellus, malesuada sed nunc vitae, posuere finibus mi. Quisque suscipit lorem eu nunc placerat fringilla. Nulla quis convallis justo. Duis mattis dolor tincidunt, aliquet felis sollicitudin, malesuada odio. Suspendisse id dui velit. Ut ultrices at massa sed sagittis. Sed metus magna, aliquet at purus id, tempus blandit sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Cras vitae vestibulum nulla. Sed id dui vestibulum, auctor nunc in, vestibulum ante. Nam ut diam cursus, porttitor sapien non, pharetra nisl.',
  },
  ...opts,
})

export const mockSongsData = (): RestSongData => ({
  data: [mockRestSong({ id: 1 }), mockRestSong({ id: 2 })],
  meta: {
    pagination: {
      page: 1,
      pageCount: 2,
      pageSize: 2,
      total: 10,
    },
  },
})
