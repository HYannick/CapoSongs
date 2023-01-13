import type { Song } from "@/domain/Song";
import type { RestSongData } from "@/api/rest/RestSong";
import { toSong } from "@/api/rest/RestSong";
import { AuthorizationHeader } from "@/api/auth-headers";
import { SongsNotFoundException } from "@/common/domain/SongsNotFoundException";

export const songResource = () => {
  const getSongs = async (pagination: { page: number }): Promise<Song[]> => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_STRAPI_API_URL}/songs?populate=*`,
        {
          ...AuthorizationHeader(import.meta.env.VITE_STRAPI_TOKEN),
        }
      );
      const response: RestSongData = await res.json();
      return response.data.map((restSong) => toSong(restSong));
    } catch (e) {
      console.log(e);
      throw new SongsNotFoundException();
    }
  };
  return {
    getSongs,
  };
};
