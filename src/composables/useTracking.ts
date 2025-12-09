import { computed } from "vue";
import type { Song } from "@/domain/Song.ts";

export const useTracking = () => {
  const trackingEnabled = computed(() => {
    return window.umami && localStorage.getItem('cookies-enabled') === 'true'
  });
  const trackAppLoad = () => {
    if(trackingEnabled.value) {
      window.umami.track()
      window.umami.track('app_load')
    }
  }

  const trackSongPlay = (song?: Song) => {
    if(trackingEnabled.value) {
      if(!song) return;
      window.umami.track('song_play', { songId: song.id.toString(), songName: song.title })
    }
  }

  const trackSongClicked = (song?: Song) => {
    if(trackingEnabled.value) {
      if(!song) return;
      window.umami.track('song_clicked', { songId: song.id.toString(), songName: song.title })
    }
  }

  const trackSongInfoView = (song?: Song) => {
    if(trackingEnabled.value) {
      if(!song) return;
      window.umami.track('song_info_view',{ songId: song.id.toString(), songName: song.title })
    }
  }

  return {
    trackAppLoad,
    trackSongPlay,
    trackSongInfoView,
    trackSongClicked
  }
}