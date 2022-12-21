import { createI18n } from "vue-i18n";

const commonI18n = {
  en: {
    common: {
      notFound: "No song found :(",
      backButton: "Go back",
    },
    search: {
      placeholder: "What song do you want to sing?",
    },
    sidebars: {
      favourite: {
        title: "Your selection",
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
  },
  fr: {
    common: {
      notFound: "Aucune chanson trouvée :(",
      backButton: "Retour",
    },
    search: {
      placeholder: "Quelle chanson veux-tu chanter ?",
    },
    sidebars: {
      favourite: {
        title: "Ta sélection",
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
