import { AuthorizationHeader } from '@/api/auth-headers'
import { paramsSerializer } from '@/api/paramsSerializer'
import type { RestSongData } from '@/api/rest/RestSong'
import { toSong } from '@/api/rest/RestSong'
import { SongsNotFoundException } from '@/common/domain/SongsNotFoundException'
import type { Page } from '@/domain/Page'
import type { Song } from '@/domain/Song'
import type { SongFilters } from '@/domain/enums/SongFilters'

export const songResource = () => {
  const getSongs = async (
    pagination: { page: number },
    searchQuery?: string,
    filters: SongFilters = {
      genres: [],
      themes: [],
    },
  ): Promise<Page<Song>> => {
    try {
      const query = paramsSerializer({
        pagination: {
          page: pagination.page,
        },
        filters: {
          title: {
            $containsi: searchQuery,
          },
          type: {
            $in: filters.genres,
          },
          theme: {
            $in: filters.themes,
          },
        },
        populate: '*',
      })
      const res = await fetch(
        `${import.meta.env.VITE_STRAPI_API_URL}/songs?${query}`,
        {
          ...AuthorizationHeader(import.meta.env.VITE_STRAPI_TOKEN),
        },
      )
      const response: RestSongData = await res.json()
      return {
        results: response.data.map((restSong) => toSong(restSong)),
        pagination: response.meta.pagination,
      }
    } catch (e) {
      throw new SongsNotFoundException()
    }
  }
  return {
    getSongs,
  }
}
