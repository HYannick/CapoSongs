import { describe, it, vi, expect, beforeEach } from "vitest";
import type { Mocked } from "vitest";
import { songResource } from "@/api/resources/SongResource";
import { stubNotFound } from "../../test-utils/backend";
import { SongsNotFoundException } from "@/common/domain/SongsNotFoundException";
import { mockSongsData } from "../../fixtures/song.fixture";
vi.mock("fetch");

const mockedAxios = fetch as Mocked<typeof fetch>;

describe("Song Resource", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  it("should fail do get songs", () => {
    const promise = Promise.reject(stubNotFound());
    mockedAxios.get.mockResolvedValue(promise);
    const resource = songResource();
    expect(resource.getSongs({ page: 1 })).rejects.toThrow(
      SongsNotFoundException
    );
  });

  it("should get paginated songs", () => {
    mockedAxios.get.mockResolvedValue({
      data: mockSongsData(),
    });
    const resource = songResource();
    expect(resource.getSongs({ page: 1 })).resolves.toEqual([
      {
        id: 1,
        title: "Avisa meu mano",
        description: "Capoeira song mock",
        difficulty: "",
        type: "",
        thumbnail: "hash.jpeg",
        source: "hash.mp3",
        lyrics_link: "hash.lrc",
        translation: "lyrics_translation_file",
        history:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et turpis purus. Sed tincidunt interdum erat, vitae laoreet neque semper rhoncus. Vestibulum non est ac nulla aliquet varius. Fusce ex tellus, malesuada sed nunc vitae, posuere finibus mi. Quisque suscipit lorem eu nunc placerat fringilla. Nulla quis convallis justo. Duis mattis dolor tincidunt, aliquet felis sollicitudin, malesuada odio. Suspendisse id dui velit. Ut ultrices at massa sed sagittis. Sed metus magna, aliquet at purus id, tempus blandit sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Cras vitae vestibulum nulla. Sed id dui vestibulum, auctor nunc in, vestibulum ante. Nam ut diam cursus, porttitor sapien non, pharetra nisl.",
      },
      {
        id: 2,
        title: "Avisa meu mano",
        description: "Capoeira song mock",
        difficulty: "",
        type: "",
        thumbnail: "hash.jpeg",
        source: "hash.mp3",
        lyrics_link: "hash.lrc",
        translation: "lyrics_translation_file",
        history:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et turpis purus. Sed tincidunt interdum erat, vitae laoreet neque semper rhoncus. Vestibulum non est ac nulla aliquet varius. Fusce ex tellus, malesuada sed nunc vitae, posuere finibus mi. Quisque suscipit lorem eu nunc placerat fringilla. Nulla quis convallis justo. Duis mattis dolor tincidunt, aliquet felis sollicitudin, malesuada odio. Suspendisse id dui velit. Ut ultrices at massa sed sagittis. Sed metus magna, aliquet at purus id, tempus blandit sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Cras vitae vestibulum nulla. Sed id dui vestibulum, auctor nunc in, vestibulum ante. Nam ut diam cursus, porttitor sapien non, pharetra nisl.",
      },
    ]);
  });
});
