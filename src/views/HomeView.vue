<template>
  <main>
    <Heading />
    <SettingsSidebar :from="SidebarOrigin.RIGHT" />
    <FavouritesSidebar :from="SidebarOrigin.LEFT" />
    <Player v-if="songStore.currentSong" />
    <div class="search-container">
      <InputField
        name="query"
        type="text"
        :placeholder="t('search.placeholder')"
        v-model="query"
        icon="search"
      />
    </div>
    <SongList :songs="filteredSongs" />
  </main>
</template>

<script setup lang="ts">
import Heading from "@/components/Heading.vue";
import SettingsSidebar from "@/components/sidebar/SettingsSidebar.vue";
import FavouritesSidebar from "@/components/sidebar/FavouritesSidebar.vue";
import Player from "@/components/sidebar/Player.vue";
import { SidebarOrigin } from "@/domain/enums/SideBarOrigin";
import { computed, onMounted, ref } from "vue";
import InputField from "@/components/component-library/InputField.vue";
import SongList from "@/components/SongList.vue";
import { useSongStore } from "@/stores/song.store";
import { useI18n } from "vue-i18n";

const query = ref("");
const songStore = useSongStore();
const { t } = useI18n();
const filteredSongs = computed(() => {
  if (!query.value) {
    return songStore.songs;
  }
  return songStore.songs.filter((song) =>
    song.title.toLowerCase().includes(query.value.toLowerCase())
  );
});

onMounted(async () => {
  await songStore.setFavouriteSongs();
});
</script>
<style lang="scss">
.search-container {
  margin-top: 3rem;
  margin-bottom: 4rem;
}
</style>
