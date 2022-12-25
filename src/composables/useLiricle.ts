import type { LyricLine } from "@/domain/LyricLine";
import type { Ref } from "vue";
import { ref } from "vue";
import Liricle from "liricle";

export const useLiricle = () => {
  const lyrics: Ref<LyricLine[]> = ref([]);
  const currentLineIndex = ref(0);

  const initLyricReader = (audioEl: HTMLAudioElement, lyricsLink: string) => {
    if (!lyricsLink) return;

    const liricleInstance = new Liricle();

    liricleInstance.on("load", (data: any) => {
      lyrics.value = data.lines.map((line: any, index: number) => ({
        ...line,
        index,
      }));
    });
    liricleInstance.on("sync", (line: LyricLine, word: LyricLine) => {
      currentLineIndex.value = line.index;
    });
    liricleInstance.load({
      url: `https://capoeira-songs.s3.eu-west-3.amazonaws.com/lyrics/${lyricsLink}`,
    });
    audioEl.addEventListener("timeupdate", () => {
      liricleInstance.sync(audioEl.currentTime);
    });
    return liricleInstance;
  };

  return {
    lyrics,
    initLyricReader,
    currentLineIndex,
  };
};
