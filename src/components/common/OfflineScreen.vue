<template>
  <div class="offline-screen">
    <Icon name="offline" size="250" />
    <div class="offline-text">
      <p class="text -bold -large-body">No internet connection found</p>
      <p class="text">
        It seems there is a problem with your connection.<br />
        Please check your network
      </p>
      <button class="offline-retry-button" @click="reloadPage">
        <span class="text -bold -body">Try again</span>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Icon from "@/components/component-library/Icon.vue";

const reloadPage = () => {
  window.location.reload();
};
</script>
