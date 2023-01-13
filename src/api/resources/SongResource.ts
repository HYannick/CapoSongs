import type { Song } from "@/domain/Song";
import type { RestSongData } from "@/api/rest/RestSong";
import { toSong } from "@/api/rest/RestSong";
import { AuthorizationHeader } from "@/api/auth-headers";
import { SongsNotFoundException } from "@/common/domain/SongsNotFoundException";
import { paramsSerializer } from "@/api/paramsSerializer";

export const songResource = () => {
  const getSongs = async (
    pagination: { page: number },
    searchQuery?: string
  ): Promise<Song[]> => {
    try {
      const query = paramsSerializer({
        filters: {
          title: {
            $containsi: searchQuery,
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
      return response.data.map((restSong) => toSong(restSong));
    } catch (e) {
      throw new SongsNotFoundException();
    }
  };
  return {
    getSongs,
  };
};
