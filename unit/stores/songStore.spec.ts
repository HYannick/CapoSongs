import { createPinia, setActivePinia } from "pinia";
import { vi, beforeEach, describe, it, expect } from "vitest";
import { useSongStore } from "@/stores/song.store";
import { mockSong, mockSongsData } from "../fixtures/song.fixture";
import * as songResource from "@/api/resources/SongResource";
let songStore: any;

// @vitest-environment jsdom
describe("Song Store", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    setActivePinia(createPinia());
    songStore = useSongStore();
  });

  describe("Song handlers", () => {
    it("should set current song settings", () => {
      expect(songStore.currentSong).toBeNull();
      songStore.loadSong(mockSong());
      expect(songStore.currentSong).toEqual(mockSong());
    });

    it("should reset current song settings", () => {
      songStore.loadSong(mockSong());
      songStore.resetSong();
      expect(songStore.currentSong).toBeNull();
    });

    it("should set next song", () => {
      songStore.songs = [
        mockSong({ id: 1 }),
        mockSong({ id: 2 }),
        mockSong({ id: 3 }),
      ];
      songStore.loadSong(mockSong({ id: 1 }));
      songStore.setNextSong();
      expect(songStore.currentSong.id).toBe(2);
      songStore.setNextSong();
      expect(songStore.currentSong.id).toBe(3);
      songStore.setNextSong();
      expect(songStore.currentSong.id).toBe(1);
    });

    it("should set previous song", () => {
      songStore.songs = [
        mockSong({ id: 1 }),
        mockSong({ id: 2 }),
        mockSong({ id: 3 }),
      ];
      songStore.loadSong(mockSong({ id: 1 }));
      songStore.setPreviousSong();
      expect(songStore.currentSong.id).toBe(1);
      songStore.setNextSong();
      expect(songStore.currentSong.id).toBe(2);
      songStore.setPreviousSong();
      expect(songStore.currentSong.id).toBe(1);
    });

    it("should enable/disable replay", () => {
      expect(songStore.replay).toBeFalsy();
      songStore.enableReplay();
      expect(songStore.replay).toBeTruthy();
    });

    it("should enable/disable replay automatic play", () => {
      expect(songStore.automaticPlay).toBeFalsy();
      songStore.enableAutomaticPlay();
      expect(songStore.automaticPlay).toBeTruthy();
    });
  });

  describe("Favourite behaviours", () => {
    it("should add song to favourite and save it to the localStorage", () => {
      const expected = [
        mockSong({ id: 1 }),
        mockSong({ id: 2 }),
        mockSong({ id: 3 }),
      ];
      expect(songStore.favouriteSongs).toEqual([]);
      const setItem = vi.spyOn(Storage.prototype, "setItem");
      songStore.addToFavourite(mockSong({ id: 1 }));
      songStore.addToFavourite(mockSong({ id: 2 }));
      songStore.addToFavourite(mockSong({ id: 3 }));
      expect(songStore.favouriteSongs).toEqual(expected);
      expect(setItem).toHaveBeenCalledWith(
        "favourite_songs",
        JSON.stringify(expected)
      );
    });

    it("should remove a song from favourite and update localStorage", () => {
      const expected = [mockSong({ id: 1 }), mockSong({ id: 3 })];
      expect(songStore.favouriteSongs).toEqual([]);
      const setItem = vi.spyOn(Storage.prototype, "setItem");
      songStore.addToFavourite(mockSong({ id: 1 }));
      songStore.addToFavourite(mockSong({ id: 2 }));
      songStore.addToFavourite(mockSong({ id: 3 }));
      songStore.removeFromFavourite(2);
      expect(songStore.favouriteSongs).toEqual(expected);
      expect(setItem).toHaveBeenCalledWith(
        "favourite_songs",
        JSON.stringify(expected)
      );
    });

    it("should retrieve favourite song from storage", async () => {
      const favouriteSongs = [mockSong({ id: 1 }), mockSong({ id: 3 })];
      const getItem = vi
        .spyOn(Storage.prototype, "getItem")
        .mockResolvedValue(JSON.stringify(favouriteSongs));
      await songStore.setFavouriteSongs();
      expect(getItem).toHaveBeenCalledWith("favourite_songs");
      expect(songStore.favouriteSongs).toEqual(favouriteSongs);
    });

    it("should return an empty array if no favourite songs", async () => {
      const getItem = vi
        .spyOn(Storage.prototype, "getItem")
        .mockResolvedValue(JSON.stringify([]));
      await songStore.setFavouriteSongs();
      expect(getItem).toHaveBeenCalledWith("favourite_songs");
      expect(songStore.favouriteSongs).toEqual([]);
    });

    it("should clear all favourite songs", () => {
      const removeItem = vi.spyOn(Storage.prototype, "removeItem");
      songStore.clearFavourites();
      expect(songStore.favouriteSongs).toEqual([]);
      expect(removeItem).toHaveBeenCalled();
    });

    it("should check if a song is favourite", () => {
      songStore.addToFavourite(mockSong({ id: 1 }));
      expect(songStore.isFavourite(1).value).toBeTruthy();
      expect(songStore.isFavourite(2).value).toBeFalsy();
    });

    it("should get songs", async () => {
      const getSongs = vi.fn().mockResolvedValue({
        results: mockSongsData().data,
        pagination: mockSongsData().meta,
      });
      vi.spyOn(songResource, "songResource").mockReturnValue({
        getSongs,
      });
      await songStore.getSongs(3, "avisa", {
        genres: ["CORRIDO", "SAMBA"],
        themes: ["SLAVERY"],
      });
      expect(getSongs).toHaveBeenCalledWith({ page: 3 }, "avisa", {
        genres: ["CORRIDO", "SAMBA"],
        themes: ["SLAVERY"],
      });
      expect(songStore.songs).toEqual(mockSongsData().data);
    });

    it("should load more songs", async () => {
      const existingSong = mockSong({ id: 5 });
      songStore.songs = [existingSong];
      const getSongs = vi.fn().mockResolvedValue({
        results: mockSongsData().data,
        pagination: mockSongsData().meta,
      });
      vi.spyOn(songResource, "songResource").mockReturnValue({
        getSongs,
      });
      await songStore.loadMoreSongs(3, "avisa", {
        genres: ["CORRIDO", "SAMBA"],
        themes: ["SLAVERY"],
      });
      expect(getSongs).toHaveBeenCalledWith({ page: 3 }, "avisa", {
        genres: ["CORRIDO", "SAMBA"],
        themes: ["SLAVERY"],
      });
      expect(songStore.songs).toEqual([existingSong, ...mockSongsData().data]);
    });
  });
});
