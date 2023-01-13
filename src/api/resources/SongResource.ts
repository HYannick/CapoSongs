import type { Song } from "@/domain/Song";
import type { RestSongData } from "@/api/rest/RestSong";
import { toSong } from "@/api/rest/RestSong";
import { AuthorizationHeader } from "@/api/auth-headers";
import { SongsNotFoundException } from "@/common/domain/SongsNotFoundException";
import { backendAxiosInstance } from "@/api/axios-instance";

export const songResource = () => {
  const getSongs = async (pagination: { page: number }): Promise<Song[]> => {
    try {
      const res = await backendAxiosInstance.get<RestSongData>(
        `${import.meta.env.VITE_STRAPI_API_URL}/songs`,
        {
          ...AuthorizationHeader(import.meta.env.VITE_STRAPI_TOKEN),
          params: {
            populate: '*',
          }
        },
      );
      return res.data.data.map((restSong) => toSong(restSong));
    } catch (e) {
      console.log(e)
      throw new SongsNotFoundException();
    }
  };
  return {
    getSongs,
  };
};
