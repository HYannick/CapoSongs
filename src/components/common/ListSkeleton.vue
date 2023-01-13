<template>
  <div class="song-list-skeleton">
    <div ref="container" class="song-item-skeleton" v-for="n in [1,2,3,4, 5,6,7,8,9,10]" :key="n">
      <div class="song-item-skeleton-thumbnail"></div>
      <div class="song-item-skeleton-title">
        <p class="text -bold"></p>
        <span></span>
      </div>
      <div class="song-item-skeleton-action">
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

interface Props {
  title?: string;
  iconSize?: number;
}
withDefaults(defineProps<Props>(), {
  title: "",
  iconSize: 150
});
</script>

<style lang="scss">
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  path,
  rect,
  line {
    stroke: var(--color-black-200);
  }
  color: var(--color-black-400);
  h4 {
    margin-top: 2.5rem;
  }
  .subtitle {
    text-align: center;
    a {
      color: var(--color-primary-600);
      font-weight: bold;
    }
  }

  .load{
    display: flex;
    justify-content: center;
  }
  .load div {
    width: 1rem;
    height: 1rem;
    background-color: var(--color-primary-600);
    border-radius: 50%;
    margin: 0 0.5rem;
    animation-name: up-and-down;
    animation-duration: 0.3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  .load .two{
    animation-delay: 0.1s;
  }

  .load .three {
    animation-delay: 0.2s;
  }

}

@keyframes up-and-down {

  to{
    opacity: 0.2;
    transform: translateY(-20px);

  }
}

.song-item-skeleton {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  cursor: pointer;
  opacity: 1;

  &:last-child {
    margin-bottom: 0;
  }

  &-thumbnail {
    width: 6rem;
    height: 6rem;
    object-fit: cover;
    border-radius: 1rem;
    overflow: hidden;
    background: var(--color-black-300);
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    transition: transform 0.1s cubic-bezier(0, 0.55, 0.45, 1);

    &:active {
      transform: scale(0.9);
    }
  }

  &-action {
    background: var(--color-black-300);
    width: 3rem;
    height: 3rem;
    border-radius: 4rem;
  }

  &-title {
    flex: 1;
    margin-left: 1rem;
    font-size: 1.6rem;
    p {
      background: var(--color-black-300);
      width: 10rem;
      height: 1rem;
      margin-bottom: 0.5rem;
      border-radius: 4rem;
    }
    span {
      background: var(--color-black-300);
      display: block;
      width: 4rem;
      height: 1rem;
      border-radius: 4rem;
    }
  }
}
</style>
