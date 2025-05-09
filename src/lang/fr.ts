export default {
  greetings:
    '<span class="text -title-1 -black' + ' color-secondary--600">H</span>ey !',
  onboarding: {
    player: {
      step1: {
        title: 'Le Chœur',
        text: 'Mets en valeur le choeur dans les paroles pour te focaliser dessus !',
      },
      step2: {
        title: 'Histoire/Traductions',
        text: "Découvre l'histoire et les traductions de la musique",
      },
    },
  },
  notificationModal: {
    title: 'Restez à jour avec nos dernières chansons',
    description:
      'Activez les notifications et nous vous tiendrons informé de toutes les dernières chansons.',
    perk_1:
      '<span class="color-secondary--600 -bold">Recevez des notifications instantanées</span> lorsque nous ajoutons de nouvelles musiques' +
      ' à notre bibliothèque.',
    perk_2:
      '<span class="color-secondary--600 -bold">Ne ratez jamais le rythme</span> avec des mises à jour en temps réel.',
    disclaimer:
      'Vous pouvez activer ou désactiver les notifications à tout moment dans les paramètres.',
    dismiss: 'Refuser',
    confirm: 'Accepter',
  },
  popups: {
    notification: {
      activated: 'Notifications activées',
      deactivated: 'Notifications désactivées',
      manualActivation: 'Activez les notifications dans vos paramètres',
    },
    errors: {
      songFetch: 'Une erreur est survenue.',
    },
  },
  cookies: {
    text:
      'Cette application utilise des cookies pour surveiller son traffic. Ceci' +
      ' est' +
      " totalement optionnel et n'empêchera pas le bon fonctionnement de l'application. En" +
      ' cliquant sur' +
      " 'accepter' vous consentez à l'utilisation de ces cookies.",
    dismiss: 'Refuser',
    confirm: 'Accepter',
    readMore: 'En savoir plus',
  },
  pwaUpdate: {
    offlineReady: 'App disponible hors ligne',
    updateReady: 'Nouvelle version disponible !',
    dismiss: 'Fermer',
    reload: 'Recharger',
  },
  homePlaceholder: {
    title: '<span>P</span>rêt à chanter ?',
    subtitle: 'Sélectionne une musique à gauche pour commencer !',
  },
  pwaInstall: {
    text: 'Pour une meilleure expérience,<br />Ajoute l’application à ton écran d’accueil :)',
    dismiss: 'Pas maintenant',
    install: 'Installer',
    appleDeviceMessage:
      'Pour iOS, va dans l’option de Partage et Ajouter à l’écran d’accueil',
  },
  common: {
    backButton: 'Retour',
    backPlayer: 'Lecteur',
    comingSoon: 'A venir',
    unknownArtist: 'Inconnu',
  },
  offlineScreen: {
    title: 'Aucune connexion',
    description:
      ' Il semble y avoir un problème avec ta connexion<br />' +
      '        Vérifie ton réseau',
    button: 'Réessayer',
  },
  search: {
    placeholder: 'Quelle chanson veux-tu chanter ?',
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
      OTHERS: 'Autres',
      MESTRES: 'Mestres',
      SLAVERY: 'Esclavage',
      ABOUT_CAPOEIRA: 'Capoeira',
      START_OF_RODA: 'Début de roda',
      END_OF_RODA: 'Fin de roda',
      LEGENDARY_CHARACTERS: 'Personnalités',
      OTHER: 'Autres',
    },
  },
  songList: {
    title: '<span class="color-secondary--600 ">M</span>usiques',
    notFound: {
      title: 'Aucune musique trouvée :(',
      message:
        'Réinitialise ta recherche, ou <span' +
        " class='color-primary--600'>écris-nous</span> !",
    },
    error: {
      title: 'Une erreur est survenue!',
      message: "Essaie de réactualiser l'application",
    },
    loading: 'Chargement',
  },
  songDetails: {
    translate: 'Traduction',
    history: 'Derrière cette chanson',
  },
  sidebars: {
    filters: {
      title: 'Filtres',
      apply: 'Appliquer les filtres',
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
        OTHERS: 'Autres',
      },
      themes: {
        title: 'Thèmes',
        MESTRES: 'Mestres',
        SLAVERY: 'Esclavage',
        ABOUT_CAPOEIRA: 'Capoeira',
        START_OF_RODA: 'Début de roda',
        END_OF_RODA: 'Fin de roda',
        LEGENDARY_CHARACTERS: 'Personnalités',
        OTHER: 'Autres',
      },
    },
    favourite: {
      title: 'Ta sélection',
      notFound: 'Aucune chanson trouvée :(',
      notFoundDetails: 'Ajoutes-en à tes favoris!',
    },
    settings: {
      title: 'Options',
      languages: {
        title: 'Langues',
        fr: 'Français',
        en: 'Anglais',
        pt: 'Portugais',
      },
      theme: 'Thème',
      notifications: 'Notifications',
      kofiLabel: 'Soutiens-moi sur Ko-fi!',
      controls: {
        space: 'Play/Pause',
        songDetails: 'Détail de la musique',
        highlightCoro: 'Highlight Coro',
        incProgress: 'Increment Player',
        decProgress: 'Decrement Player',
        close: 'Quitter le lecteur',
        settings: 'Ouvrir Options',
        favourite: 'Ouvrir Favoris',
        theme: 'Changer Thème',
        prevSong: 'Précédent',
        nextSong: 'Suivant',
      },
    },
  },
  share: {
    title: "Partager l'app",
    button: 'Partager',
    action: {
      text: "Envie d'apprendre un peu de musique de Capoeira ? Go sur Focamu !",
    },
    heading:
      "Partage l'application à d'autres pour étendre notre empire. Mwahahah.",
    copy: 'Copier le lien :: https://focamu.com',
    copied: 'Lien copié !',
  },
  support: {
    button: 'Support',
    title: 'Support',
    heading: "Un problème ? Un nouvel ajout de musique ? c'est par ici !",
    textarea: {
      placeholder: 'Dis nous :)',
    },
    options: {
      default: ":: Sélectionner l'objet ::",
      technical: 'Problème technique',
      request: "Ajout d'une musique",
      typo: 'Problème de paroles / Trad. / Fautes',
      contribute: 'Demande de contribution',
      feature: 'Demande de fonctionnalité',
      feedback: 'Ou juste un avis',
    },
    buttons: {
      cancel: 'Annuler',
      submit: 'Envoyer',
    },
  },
  mentions: {
    button: 'Mentions spéciales',
    title: 'Ressources et mentions',
    appDev: "Développement de l'app",
    stackLib: 'Stack / Librairies',
    lyricsTrad: 'Lyrics / Traductions / Histoires',
    musicSources: 'Musiques + Traitement Lyrics',
  },
}
