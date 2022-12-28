import { createI18n } from "vue-i18n";

const commonI18n = {
  en: {
    greetings:
      '<span class="text -title-1 -black' +
      ' color-secondary--600">H</span>ello!',
    pwaUpdate: {
      offlineReady: "App ready to work offline",
      updateReady: "New version available!",
      dismiss: "Close",
      reload: "Reload",
    },
    homePlaceholder: {
      title: 'Ready to sing ?',
      subtitle: ' Select a song on the left and start!',
    },
    pwaInstall: {
      text: "For a better user experience<br />Add the app to your homescreen :)",
      dismiss: "Not now",
      install: "Install",
      appleDeviceMessage:
        "For Apple devices go to Share Options -> Add to" + " homescreen",
    },
    common: {
      notFound: "No song found :(",
      backButton: "Go back",
      backPlayer: "Player",
    },
    search: {
      placeholder: "What song do you want to sing?",
    },
    songList: {
      title: '<span class="color-secondary--600">S</span>ongs',
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
      button: "Special mentions",
      title: "Resources and mentions",
      appDev: "Application development",
      stackLib: "Stack / Libraries",
      lyricsTrad: "Lyrics / Translations / Story",
      musicSources: "Music and Lyrics parsing",
    },
  },
  fr: {
    greetings:
      '<span class="text -title-1 -black' +
      ' color-secondary--600">H</span>ey !',
    pwaUpdate: {
      offlineReady: "App disponible hors ligne",
      updateReady: "Nouvelle version disponible !",
      dismiss: "Fermer",
      reload: "Recharger",
    },
    homePlaceholder: {
      title: 'Prêt à chanter ?',
      subtitle: 'Sélectionne une musique à gauche pour commencer !',
    },
    pwaInstall: {
      text: "Pour une meilleure expérience,<br />Ajoute l’application à ton écran d’accueil :)",
      dismiss: "Pas maintenant",
      install: "Installer",
      appleDeviceMessage:
        "Pour iOS, va dans l’option de Partage et Ajouter à l’écran d’accueil",
    },
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
      title: '<span class="color-secondary--600">M</span>usiques',
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
      button: "Mentions spéciales",
      title: "Ressources et mentions",
      appDev: "Développement de l'app",
      stackLib: "Stack / Librairies",
      lyricsTrad: "Lyrics / Traductions / Histoires",
      musicSources: "Musiques + Traitement Lyrics",
    },
  },
  pt: {
    songList: {
      title: '<span class="color-secondary--600">C</span>anções',
    },
    greetings:
      '<span class="text -title-1 -black' +
      ' color-secondary--600">Bom</span> dia!',
    common: {
      hey: "Bom dia!",
    },
    search: {
      placeholder: "Que música queres cantar?",
    },
  },
};

export const i18n = createI18n({
  locale: "fr",
  fallbackLocale: "fr",
  messages: commonI18n,
  legacy: false,
});
