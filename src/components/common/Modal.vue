<template>
  <div class="modal">
    <div class="modal-body" ref="modalContainerRef">
      <slot></slot>
    </div>
    <div class="modal-overlay" ref="overlayRef" @click="closeModale"></div>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap'
import { onMounted, ref } from 'vue'
const modalContainerRef = ref()
const overlayRef = ref()
let timeline: any
const emits = defineEmits(['onClose'])
const closeModale = () => {
  timeline.timeScale(2).reverse()
}

onMounted(() => {
  timeline = gsap.timeline({ onReverseComplete: () => emits('onClose') })
  timeline
    .from(
      overlayRef.value,
      {
        duration: 0.5,
        ease: 'back',
        opacity: 0,
      },
      '-=0.3',
    )
    .from(
      modalContainerRef.value,
      {
        duration: 0.7,
        ease: 'back',
        opacity: 0,
        y: 50,
      },
      '-=0.4',
    )
})
</script>

<style lang="scss">
.modal {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  .modal-body {
    background: var(--color-background);
    box-shadow: 0 0 0.2rem var(--color-black-400);
    padding: 1.5rem;
    border-radius: 1rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    z-index: 999;
  }
}
.modal-overlay {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-background);
  opacity: 0.9;
}
</style>
