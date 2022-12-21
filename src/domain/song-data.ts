import type { Song } from "@/domain/Song";

export const mockSong = (opts?: Partial<Song>): Song => ({
  id: "uuid",
  thumbnail:
    "https://www.capoeirashop.fr/modules/wpthemeconfigurator/views/img/bd90c8fc4c37b9521d4dce481bc4681cd8883a20_ban-clothing.jpg",
  source: "song_url.mp3",
  title: "Avisa meu mano",
  description: "Capoeira song mock",
  lyrics_link: "lyrics_link",
  lyrics_translation: "lyrics_translation_file",
  history:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et turpis purus. Sed tincidunt interdum erat, vitae laoreet neque semper rhoncus. Vestibulum non est ac nulla aliquet varius. Fusce ex tellus, malesuada sed nunc vitae, posuere finibus mi. Quisque suscipit lorem eu nunc placerat fringilla. Nulla quis convallis justo. Duis mattis dolor tincidunt, aliquet felis sollicitudin, malesuada odio. Suspendisse id dui velit. Ut ultrices at massa sed sagittis. Sed metus magna, aliquet at purus id, tempus blandit sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Cras vitae vestibulum nulla. Sed id dui vestibulum, auctor nunc in, vestibulum ante. Nam ut diam cursus, porttitor sapien non, pharetra nisl.",
  ...opts,
});
export const mockedSongs: Song[] = [
  mockSong({
    source: "avisa_meu_mano.mp3",
  }),
  mockSong({
    id: "uuid2",
    thumbnail:
      "https://www.campingledauphin.com/content/uploads/2019/02/Capoeira-cours-camping-argeles-01.jpg",
    title: "Ta na gaiola",
    source: "ta_na_gaiola.mp3",
  }),
  mockSong({
    id: "uuid3",
    thumbnail:
      "https://mjcjeancocteau.org/wp-content/uploads/2022/05/capoeira-768x530.jpg",
    title: "San antonio quiero agua",
    source: "santo_antonio_quero_agua.mp3",
  }),
  mockSong({
    id: "uuid3",
    thumbnail:
      "https://mjcjeancocteau.org/wp-content/uploads/2022/05/capoeira-768x530.jpg",
    title: "Foi no clarao da lua",
    lyrics_link: "foi_no_clarao_da_lua.lrc",
    source: "foi_no_clarao_da_lua.mp3",
  }),
];

export const songData: Song[] = [
  {
    id: 'avisa_meu_mano',
    thumbnail:
      "https://www.capoeirashop.fr/modules/wpthemeconfigurator/views/img/bd90c8fc4c37b9521d4dce481bc4681cd8883a20_ban-clothing.jpg",
    title: "Avisa meu mano",
    source: "avisa_meu_mano.mp3",
    lyrics_link: "avisa_meu_mano.lrc",
    description: "Capoeira song mock",
    lyrics_translation: "avisa_meu_mano_translation",
    history:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et turpis purus. Sed tincidunt interdum erat, vitae laoreet neque semper rhoncus. Vestibulum non est ac nulla aliquet varius. Fusce ex tellus, malesuada sed nunc vitae, posuere finibus mi. Quisque suscipit lorem eu nunc placerat fringilla. Nulla quis convallis justo. Duis mattis dolor tincidunt, aliquet felis sollicitudin, malesuada odio. Suspendisse id dui velit. Ut ultrices at massa sed sagittis. Sed metus magna, aliquet at purus id, tempus blandit sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Cras vitae vestibulum nulla. Sed id dui vestibulum, auctor nunc in, vestibulum ante. Nam ut diam cursus, porttitor sapien non, pharetra nisl.",
  },
  {
    id: 'ta_na_gaiola',
    thumbnail:
      "https://www.campingledauphin.com/content/uploads/2019/02/Capoeira-cours-camping-argeles-01.jpg",
    title: "Ta na gaiola",
    source: "ta_na_gaiola.mp3",
    lyrics_link: "ta_na_gaiola.lrc",
    description: "Capoeira song mock",
    lyrics_translation: "ta_na_gaiola_translation",
    history:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et turpis purus. Sed tincidunt interdum erat, vitae laoreet neque semper rhoncus. Vestibulum non est ac nulla aliquet varius. Fusce ex tellus, malesuada sed nunc vitae, posuere finibus mi. Quisque suscipit lorem eu nunc placerat fringilla. Nulla quis convallis justo. Duis mattis dolor tincidunt, aliquet felis sollicitudin, malesuada odio. Suspendisse id dui velit. Ut ultrices at massa sed sagittis. Sed metus magna, aliquet at purus id, tempus blandit sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Cras vitae vestibulum nulla. Sed id dui vestibulum, auctor nunc in, vestibulum ante. Nam ut diam cursus, porttitor sapien non, pharetra nisl.",
  },
  {
    id: 'santo_antonio_quero_agua',
    thumbnail:
      "https://mjcjeancocteau.org/wp-content/uploads/2022/05/capoeira-768x530.jpg",
    title: "San antonio quiero agua",
    source: "santo_antonio_quero_agua.mp3",
    lyrics_link: "santo_antonio_quero_agua.lrc",
    lyrics_translation: "santo_antonio_quero_agua_translation",
    description: "Capoeira song mock",
    history:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et turpis purus. Sed tincidunt interdum erat, vitae laoreet neque semper rhoncus. Vestibulum non est ac nulla aliquet varius. Fusce ex tellus, malesuada sed nunc vitae, posuere finibus mi. Quisque suscipit lorem eu nunc placerat fringilla. Nulla quis convallis justo. Duis mattis dolor tincidunt, aliquet felis sollicitudin, malesuada odio. Suspendisse id dui velit. Ut ultrices at massa sed sagittis. Sed metus magna, aliquet at purus id, tempus blandit sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Cras vitae vestibulum nulla. Sed id dui vestibulum, auctor nunc in, vestibulum ante. Nam ut diam cursus, porttitor sapien non, pharetra nisl.",
  },
  {
    id: 'foi_no_clarao_da_lua',
    thumbnail:
      "https://mjcjeancocteau.org/wp-content/uploads/2022/05/capoeira-768x530.jpg",
    title: "Foi no clarao da lua",
    lyrics_link: "foi_no_clarao_da_lua.lrc",
    source: "foi_no_clarao_da_lua.mp3",
    lyrics_translation: "foi_no_clarao_da_lua_translation",
    description: "Capoeira song mock",
    history:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et turpis purus. Sed tincidunt interdum erat, vitae laoreet neque semper rhoncus. Vestibulum non est ac nulla aliquet varius. Fusce ex tellus, malesuada sed nunc vitae, posuere finibus mi. Quisque suscipit lorem eu nunc placerat fringilla. Nulla quis convallis justo. Duis mattis dolor tincidunt, aliquet felis sollicitudin, malesuada odio. Suspendisse id dui velit. Ut ultrices at massa sed sagittis. Sed metus magna, aliquet at purus id, tempus blandit sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Cras vitae vestibulum nulla. Sed id dui vestibulum, auctor nunc in, vestibulum ante. Nam ut diam cursus, porttitor sapien non, pharetra nisl.",
  },
];
