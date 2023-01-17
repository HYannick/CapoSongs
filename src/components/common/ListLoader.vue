<template>
  <div class="loader" :class="{'-small': small}">
    <div class="load">
      <div class="one"></div>
      <div class="two"></div>
      <div class="three"></div>
    </div>
    <h4 class="text -title-3 -bold">{{ title }}</h4>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

interface Props {
  title?: string;
  iconSize?: number;
  small?: boolean;
}
withDefaults(defineProps<Props>(), {
  title: "",
  iconSize: 150,
  small: false,
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
  &.-small {
    height: 8rem;
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
</style>
