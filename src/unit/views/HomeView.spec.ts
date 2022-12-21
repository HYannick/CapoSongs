import { describe, it, expect, vi } from "vitest";

import { shallowMount } from "@vue/test-utils";
import { mockI18n } from "../test-utils/i18n";
import HomeView from "@/views/HomeView.vue";
import { mockedSongs, mockSong } from "@/domain/song-data";
// @vitest-environment jsdom
describe("HomeView", () => {
  it("should get no result with invalid song", async () => {
    const wrapper = shallowMount(HomeView, {
      global: {
        plugins: [mockI18n()],
      },
    });
    const component = wrapper.vm;
    component.songs = mockedSongs;
    component.query = "tana";
    expect(component.filteredSongs).toEqual([]);
  });

  it("should get result with valid song", async () => {
    const wrapper = shallowMount(HomeView, {
      global: {
        plugins: [mockI18n()],
      },
    });
    const component = wrapper.vm;
    component.songs = mockedSongs;
    component.query = "ta na";
    expect(component.filteredSongs).toEqual([
      mockSong({
        id: "uuid2",
        thumbnail:
          "https://www.campingledauphin.com/content/uploads/2019/02/Capoeira-cours-camping-argeles-01.jpg",
        title: "Ta na gaiola",
      }),
    ]);

    component.query = "io";
    expect(component.filteredSongs).toEqual([
      mockSong({
        id: "uuid2",
        thumbnail:
          "https://www.campingledauphin.com/content/uploads/2019/02/Capoeira-cours-camping-argeles-01.jpg",
        title: "Ta na gaiola",
      }),
      mockSong({
        id: "uuid3",
        thumbnail:
          "https://mjcjeancocteau.org/wp-content/uploads/2022/05/capoeira-768x530.jpg",
        title: "San antonio quiero agua",
      }),
    ]);
  });

  it("should return all the songs on empty query", () => {
    const wrapper = shallowMount(HomeView, {
      global: {
        plugins: [mockI18n()],
      },
    });
    const component = wrapper.vm;
    component.songs = mockedSongs;
    component.query = "ta na";
    expect(component.filteredSongs).toEqual([
      mockSong({
        id: "uuid2",
        thumbnail:
          "https://www.campingledauphin.com/content/uploads/2019/02/Capoeira-cours-camping-argeles-01.jpg",
        title: "Ta na gaiola",
      }),
    ]);
    component.query = "";
    expect(component.filteredSongs).toEqual(component.songs);
  });
});
