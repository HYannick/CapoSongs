import type { Song } from "@/domain/Song";
import type { RestSongData } from "@/api/rest/RestSong";
import { toSong } from "@/api/rest/RestSong";
import { AuthorizationHeader } from "@/api/auth-headers";
import { SongsNotFoundException } from "@/common/domain/SongsNotFoundException";
import type { SongFilters } from "@/domain/enums/SongFilters";
import { paramsSerializer } from "@/api/paramsSerializer";
import type { Page } from "@/domain/Page";

export const songResource = () => {
  const getSongs = async (
    pagination: { page: number },
    searchQuery?: string,
    filters: SongFilters = {
      genres: [],
      themes: []
    },
  ): Promise<Page<Song>> => {
    try {
      // const searchQueryString = searchQuery ? `filters[title][$containsi]=${searchQuery}&` : ""
      // const typeFiltersQueryString = filters && filters.genre.length ? `filters[type][$in]=${filters.genre}&` : ""
      // const themeFiltersQueryString = filters && filters.theme.length ? `filters[theme][$in]=${filters.theme}&` : ""
      // const res = await fetch(
      //   `${import.meta.env.VITE_STRAPI_API_URL}/songs?${searchQueryString}${typeFiltersQueryString}${themeFiltersQueryString}populate=*`,
      //   {
      //     ...AuthorizationHeader(import.meta.env.VITE_STRAPI_TOKEN),
      //   }
      // );

      //TODO replace above by this
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
        populate: "*",
      });
      const res = await fetch(
        `${import.meta.env.VITE_STRAPI_API_URL}/songs?${query}`,
        {
          ...AuthorizationHeader(import.meta.env.VITE_STRAPI_TOKEN),
        }
      );
      const response: RestSongData = await res.json();
      return {
        results: response.data.map((restSong) => toSong(restSong)),
        pagination: response.meta.pagination,
      }
    } catch (e) {
      throw new SongsNotFoundException();
    }
  };
  return {
    getSongs,
  };
};
