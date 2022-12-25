import { createPinia, setActivePinia } from "pinia";
import { vi, beforeEach, describe, it, expect } from "vitest";
import { useSongStore } from "@/stores/song.store";
import { mockSong } from "@/unit/fixtures/song.fixture";

let songStore: any;

// @vitest-environment jsdom
describe("Song Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    songStore = useSongStore();
  });

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
});
