import { createI18n } from "vue-i18n";

const commonI18n = {
  en: {
    common: {
      notFound: "No song found :(",
      backButton: "Go back",
      backPlayer: "Player",
    },
    search: {
      placeholder: "What song do you want to sing?",
    },
    songList: {
      notFound: "Songs not found :(",
      notFoundDetails: "Reset your search!",
    },
    songDetails: {
      translate: "Translation",
      history: "Behind the song",
    },
    sidebars: {
      favourite: {
        title: "Your selection",
        notFound: "Songs not found :(",
        notFoundDetails: "Add some to your favourites!",
      },
      settings: {
        title: "Settings",
        languages: {
          title: "Languages",
          fr: "French",
          en: "English",
          pt: "Portuguese",
        },
        theme: "Theme",
      },
    },
    mentions: {
      title: "Resources and mentions",
      appDev: "Application development",
      stackLib: "Stack / Libraries",
      lyricsTrad: "Lyrics / Translations / Story",
      musicSources: "Music and Lyrics parsing",
    },
  },
  fr: {
    common: {
      backButton: "Retour",
      backPlayer: "Lecteur",
    },
    songDetails: {
      translate: "Traduction",
      history: "Derrière cette chanson",
    },
    search: {
      placeholder: "Quelle chanson veux-tu chanter ?",
    },
    songList: {
      notFound: "Aucune chanson trouvée :(",
      notFoundDetails: "Réinitialise ta recherche !",
    },
    sidebars: {
      favourite: {
        title: "Ta sélection",
        notFound: "Aucune chanson trouvée :(",
        notFoundDetails: "Ajoutes-en à tes favoris!",
      },
      settings: {
        title: "Options",
        languages: {
          title: "Langues",
          fr: "Français",
          en: "Anglais",
          pt: "Portugais",
        },
        theme: "Thème",
      },
    },
    mentions: {
      title: "Ressources et mentions",
      appDev: "Développement de l'app",
      stackLib: "Stack / Librairies",
      lyricsTrad: "Lyrics / Traductions / Histoires",
      musicSources: "Musiques + Traitement Lyrics",
    },
  },
  pt: {
    common: {
      hey: "Bom dia!",
    },
  },
};

export const i18n = createI18n({
  locale: "fr",
  fallbackLocale: "fr",
  messages: commonI18n,
  legacy: false,
});
