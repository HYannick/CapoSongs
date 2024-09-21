import { computed, ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import type { Song } from "@/domain/Song";
import { songResource } from "@/api/resources/SongResource";
import type { SongFilters } from "@/domain/enums/SongFilters";

const FAVOURITE_SONGS_STORAGE_KEY = "favourite_songs";

export const useSongStore = defineStore("songs", () => {
  const songs: Ref<Song[]> = ref([]);
  const currentSong: Ref<Song | null> = ref(null);
  const favouriteSongs: Ref<Song[]> = ref([]);
  const fetchingSongs = ref(false);
  const isLoadingMoreSongs = ref(false);
  const pageCount = ref(0);

  const replay = ref(false);
  const automaticPlay = ref(false);
  const loadSong = (songToLoad: Song) => {
    currentSong.value = songToLoad;
  };

  const getSongs = async (
    page: number = 1,
    searchQuery?: string,
    filters?: SongFilters
  ) => {
    fetchingSongs.value = true;
    const { getSongs } = songResource();
    const { results, pagination } = await getSongs(
      { page },
      searchQuery,
      filters
    );
    songs.value = results;
    fetchingSongs.value = false;
    pageCount.value = pagination.pageCount;
  };

  const loadMoreSongs = async (
    page: number = 1,
    searchQuery?: string,
    filters?: SongFilters
  ) => {
    isLoadingMoreSongs.value = true;
    const { getSongs } = songResource();
    const { results } = await getSongs({ page }, searchQuery, filters);
    songs.value = [...songs.value, ...results];
    isLoadingMoreSongs.value = false;
  };

  const enableReplay = () => {
    replay.value = !replay.value;
  };

  const enableAutomaticPlay = () => {
    automaticPlay.value = !automaticPlay.value;
  };

  const resetSong = () => {
    currentSong.value = null;
  };

  const resetSongs = () => {
    songs.value = [];
  };

  const setNextSong = () => {
    const index = songs.value
      .map((song) => song.id)
      .indexOf(currentSong.value!.id);
    const nextSong = songs.value[index + 1];
    if (nextSong) {
      currentSong.value = nextSong;
    } else {
      currentSong.value = songs.value[0];
    }
  };

  const setPreviousSong = () => {
    const index = songs.value.indexOf(currentSong.value!);
    const previousSong = songs.value[index - 1];
    if (previousSong) {
      currentSong.value = previousSong;
    }
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
    localStorage.setItem(
      FAVOURITE_SONGS_STORAGE_KEY,
      JSON.stringify(favouriteSongs.value)
    );
  };

  const removeFromFavourite = async (songId: number) => {
    favouriteSongs.value = favouriteSongs.value.filter(
      (song) => song.id !== songId
    );
    localStorage.setItem(
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
    setNextSong,
    setPreviousSong,
    enableReplay,
    replay,
    enableAutomaticPlay,
    automaticPlay,
    getSongs,
    fetchingSongs,
    resetSongs,
    loadMoreSongs,
    isLoadingMoreSongs,
    pageCount,
  };
});
