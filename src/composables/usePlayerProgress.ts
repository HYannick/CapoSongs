import { ref } from "vue";
import type { Ref } from "vue";

export const usePlayerProgress = (audioElement: Ref, progress: Ref) => {
  const currentTime = ref();
  const songDuration = ref();
  const percent = ref();

  const getTime = () => {
    updateProgressBar();
    setTimers();
  };

  const scrub = (event: any) => {
    audioElement.value.currentTime =
      (event.offsetX / progress.value.offsetWidth) *
      audioElement.value.duration;
  };

  const updateProgressBar = () => {
    percent.value = `${
      (audioElement.value.currentTime / audioElement.value.duration) * 100
    }%`;
  };

  const setTimers = () => {
    currentTime.value = new Date(audioElement.value.currentTime * 1000)
      .toLocaleTimeString()
      .slice(3, 8);
    songDuration.value = new Date(audioElement.value.duration * 1000)
      .toLocaleTimeString()
      .slice(3, 8);
  };

  return {
    updateProgressBar,
    setTimers,
    scrub,
    getTime,
    percent,
    currentTime,
    songDuration,
  };
};
