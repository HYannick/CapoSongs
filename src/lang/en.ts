export default {
  greetings:
    '<span class="text -title-1 -black' +
    ' color-secondary--600">H</span>ello!',
  onboarding: {
    player: {
      step1: {
        title: 'Highlight choir',
        text: 'Highlight the choir in the lyrics of the song',
      },
      step2: {
        title: 'History/Translations',
        text: 'Discover the story and meanings of the song and the translations',
      },
    },
  },
  cookies: {
    text:
      'This application use cookies to monitor its traffic. This is completely optional as' +
      " it won't alterate the application use. By clicking Accept you consent to let us use them.",
    dismiss: 'Refuse',
    confirm: 'Accept',
    readMore: 'Read more',
  },
  pwaUpdate: {
    offlineReady: 'App ready to work offline',
    updateReady: 'New version available!',
    dismiss: 'Close',
    reload: 'Reload',
  },
  homePlaceholder: {
    title: 'Ready to sing ?',
    subtitle: ' Select a song on the left and start!',
  },
  offlineScreen: {
    title: 'No internet connection found',
    description:
      ' It seems there is a problem with your connection.<br />' +
      '        Please check your network',
    button: 'Try again',
  },
  pwaInstall: {
    text: 'For a better user experience<br />Add the app to your homescreen :)',
    dismiss: 'Not now',
    install: 'Install',
    appleDeviceMessage:
      'For Apple devices go to Share Options -> Add to' + ' homescreen',
  },
  common: {
    notFound: 'No song found :(',
    backButton: 'Go back',
    backPlayer: 'Player',
    comingSoon: 'Coming soon',
    unknownArtist: 'Unknown',
  },
  search: {
    placeholder: 'What song do you want to sing?',
    filters: {
      LADAINHA: 'Ladainha',
      CORRIDO: 'Corrido',
      MACULELE: 'Maculele',
      SAMBA_DE_RODA: 'Samba de roda',
      TOQUES: 'Toques',
      QUADRA: 'Quadra',
      LOUVACAO: 'Louvaçao',
      CHULAS: 'Chulas',
      SAMBA: 'Samba',
      OTHERS: 'Others',
      MESTRES: 'Mestres',
      SLAVERY: 'Slavery',
      ABOUT_CAPOEIRA: 'About Capoeira',
      START_OF_RODA: 'Start of roda',
      END_OF_RODA: 'End of roda',
      LEGENDARY_CHARACTERS: 'Characters',
      OTHER: 'Other',
    },
  },
  notificationModal: {
    title: 'Stay Updated with Our Latest Songs',
    description:
      "Turn on notifications and we'll keep you in the loop with all the latest tunes.",
    perk_1:
      '<span class="color-secondary--600 -bold">Receive instant notifications</span> when we add new' +
      ' musics' +
      ' to our library.',
    perk_2:
      '<span class="color-secondary--600 -bold">Never miss a beat</span> with timely updates.',
    disclaimer:
      'You can activate or deactivate notifications at any time in the settings.',
    dismiss: 'Refuser',
    confirm: 'Accepter',
  },
  popups: {
    notification: {
      activated: 'Notifications activated',
      deactivated: 'Notifications deactivated',
      manualActivation: 'Activate notifications in the settings of your phone',
    },
    errors: {
      songFetch: 'An error occurred.',
    },
  },
  songList: {
    title: '<span class="color-secondary--600">S</span>ongs',
    notFound: {
      title: 'No song found :(',
      message:
        "Reset your search or <span class='color-primary--600'>send us a new song</span>!",
    },
    error: {
      title: 'Oh no. An error occurred!',
      message: 'Try to refresh the application',
    },
    loading: 'Loading',
  },
  songDetails: {
    translate: 'Translation',
    history: 'Behind the song',
  },
  sidebars: {
    filters: {
      title: 'Filters',
      apply: 'Apply filters',
      genres: {
        title: 'Genres',
        LADAINHA: 'Ladainha',
        CORRIDO: 'Corrido',
        MACULELE: 'Maculele',
        SAMBA_DE_RODA: 'Samba de roda',
        TOQUES: 'Toques',
        QUADRA: 'Quadra',
        LOUVACAO: 'Louvaçao',
        CHULAS: 'Chulas',
        SAMBA: 'Samba',
        OTHERS: 'Others',
      },
      themes: {
        title: 'Themes',
        MESTRES: 'Mestres',
        SLAVERY: 'Slavery',
        ABOUT_CAPOEIRA: 'About Capoeira',
        START_OF_RODA: 'Start of roda',
        END_OF_RODA: 'End of roda',
        LEGENDARY_CHARACTERS: 'Characters',
        OTHER: 'Other',
      },
    },
    favourite: {
      title: 'Your selection',
      notFound: 'Songs not found :(',
      notFoundDetails: 'Add some to your favourites!',
    },
    settings: {
      title: 'Settings',
      languages: {
        title: 'Languages',
        fr: 'French',
        en: 'English',
        pt: 'Portuguese',
      },
      theme: 'Theme',
      notifications: 'Notifications',
      kofiLabel: 'Support me on Ko-fi!',
      controls: {
        space: 'Play/Pause',
        songDetails: 'View Song Details',
        highlightCoro: 'Highlight Coro',
        incProgress: 'Increment player progress',
        decProgress: 'Decrement player progress',
        close: 'Quit player',
        settings: 'Open Settings',
        favourite: 'Open Favourite Songs',
        theme: 'Switch Theme',
        prevSong: 'Previous',
        nextSong: 'Next',
      },
    },
  },
  share: {
    title: 'Share the app',
    button: 'Share',
    action: {
      text: 'Want to learn some Capoeira Music? Check out Focamu!',
    },
    heading: 'Share the app and expand our empire. Mwahahah.',
    copy: 'Copy the link :: https://focamu.com',
    copied: 'Link copied!',
  },
  support: {
    button: 'Support',
    title: 'Support',
    heading:
      'Having an issue? Want us to add some music? Write your request below',
    textarea: {
      placeholder: 'Tell us :)',
    },
    options: {
      default: ':: Select the subject ::',
      technical: 'Technical issue',
      request: 'Song request',
      typo: 'Wrong lyrics / Translation / Story / Typo',
      contribute: 'Contribute',
      feature: 'Feature request',
      feedback: 'Or just some feedback',
    },
    buttons: {
      cancel: 'Cancel',
      submit: 'Send',
    },
  },
  mentions: {
    button: 'Special mentions',
    title: 'Resources and mentions',
    appDev: 'Application development',
    stackLib: 'Stack / Libraries',
    lyricsTrad: 'Lyrics / Translations / Story',
    musicSources: 'Music and Lyrics parsing',
  },
}
