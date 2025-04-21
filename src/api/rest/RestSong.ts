import type { Song } from '@/domain/Song'

export type RestSongPicture = {
  data: {
    attributes: {
      formats: {
        thumbnail: {
          hash: string
          ext: string
          url: string
        }
      }
      hash: string
      ext: string
      url: string
    }
  }
}

export type RestSongFileSource = {
  data: {
    id: number
    attributes: {
      hash: string
      ext: string
      url: string
    }
  }
}
export interface RestSong {
  id: number
  attributes: {
    title: string
    description: string
    translation: string
    history: string
    difficulty: string
    type: string
    thumbnail: RestSongPicture
    source: RestSongFileSource
    lyrics_link: RestSongFileSource
  }
}

export interface RestPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface RestSongData {
  data: RestSong[]
  meta: {
    pagination: RestPagination
  }
}

export const toSong = (restSong: RestSong): Song => {
  const { id, attributes: song } = restSong
  return {
    ...song,
    id,
    lyrics_link: `${song.lyrics_link.data.attributes.hash}${song.lyrics_link.data.attributes.ext}`,
    source: `${song.source.data.attributes.hash}${song.source.data.attributes.ext}`,
    thumbnail: `${song.thumbnail.data.attributes.hash}${song.thumbnail.data.attributes.ext}`,
  }
}
