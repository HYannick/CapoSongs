<template>
  <label class="input-switch">
    <input type="checkbox" @change="$emit('change')" :checked="checked" />
    <span class="slider round"></span>
  </label>
</template>
<script lang="ts" setup>
defineProps({
  checked: Boolean,
});
defineEmits(["change"]);
</script>

<style lang="scss">
.input-switch {
  position: relative;
  display: block;
  width: 6rem;
  height: 3.4rem;
}

.input-switch input {
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .slider {
    background-color: var(--color-primary-600);
  }

  &:focus + .slider {
    box-shadow: 0 0 0.1rem var(--color-primary-600);
  }

  &:checked + .slider:before {
    transform: translateX(2.6rem);
  }
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-black-100);
  -webkit-transition: 0.4s;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: "";
    height: 2.6rem;
    width: 2.6rem;
    left: 0.4rem;
    bottom: 0.4rem;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  &.round {
    border-radius: 3.4rem;
    &:before {
      border-radius: 50%;
    }
  }
}
</style>
