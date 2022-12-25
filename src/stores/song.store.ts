import { computed, ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import type { Song } from "@/domain/Song";
import songData from "@/domain/song-data.json";

const FAVOURITE_SONGS_STORAGE_KEY = "favourite_songs";

export const useSongStore = defineStore("songs", () => {
  const songs: Ref<Song[]> = ref(songData.songs);
  const currentSong: Ref<Song | null> = ref(null);
  const favouriteSongs: Ref<Song[]> = ref([]);
  const loadSong = (songToLoad: Song) => {
    currentSong.value = songToLoad;
  };

  const resetSong = () => {
    currentSong.value = null;
  };

  const isFavourite = (songId: number) =>
    computed(() => !!favouriteSongs.value.find((song) => song.id === songId));

  const addToFavourite = async (songToAdd: Song) => {
    const existingSong = favouriteSongs.value.find(
      (song) => song.id === songToAdd.id
    );
    if (existingSong) {
      await removeFromFavourite(songToAdd.id);
      return;
    }
    favouriteSongs.value = [...favouriteSongs.value, songToAdd];
    await localStorage.setItem(
      FAVOURITE_SONGS_STORAGE_KEY,
      JSON.stringify(favouriteSongs.value)
    );
  };

  const removeFromFavourite = async (songId: number) => {
    favouriteSongs.value = favouriteSongs.value.filter(
      (song) => song.id !== songId
    );
    await localStorage.setItem(
      FAVOURITE_SONGS_STORAGE_KEY,
      JSON.stringify(favouriteSongs.value)
    );
  };

  const setFavouriteSongs = async () => {
    const songsFromStorage = await localStorage.getItem(
      FAVOURITE_SONGS_STORAGE_KEY
    );

    if (!songsFromStorage) {
      favouriteSongs.value = [];
      return;
    }

    favouriteSongs.value = JSON.parse(songsFromStorage);
  };

  const clearFavourites = () => {
    favouriteSongs.value = [];
    localStorage.removeItem(FAVOURITE_SONGS_STORAGE_KEY);
  };

  return {
    songs,
    currentSong,
    loadSong,
    resetSong,
    favouriteSongs,
    setFavouriteSongs,
    addToFavourite,
    removeFromFavourite,
    clearFavourites,
    isFavourite,
  };
});
