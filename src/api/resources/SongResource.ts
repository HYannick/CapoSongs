import type { Song } from "@/domain/Song";
import type { RestSongData } from "@/api/rest/RestSong";
import { toSong } from "@/api/rest/RestSong";
import { AuthorizationHeader } from "@/api/auth-headers";
import { SongsNotFoundException } from "@/common/domain/SongsNotFoundException";
import { paramsSerializer } from "@/api/paramsSerializer";

const SONGS_URL = (queryParams: string) =>
  `${import.meta.env.VITE_STRAPI_API_URL}/songs?${queryParams}`;

export const songResource = () => {
  const getSongs = async (pagination: { page: number }): Promise<Song[]> => {
    try {
      const res = await fetch(SONGS_URL(paramsSerializer({ populate: "*" })), {
        ...AuthorizationHeader(import.meta.env.VITE_STRAPI_TOKEN),
      });
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
