<template>
  <div class="input-container" :class="{ '-with-icon': icon }">
    <div v-if="icon" class="input-icon-wrapper">
      <Icon :name="icon" :size="20" />
    </div>
    <input
      :id="name"
      :name="name"
      :type="type"
      class="input"
      :placeholder="placeholder"
      :value="modelValue"
      :class="inputClasses"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div
      class="input-action-icon-wrapper"
      :class="{ '-visible': actionIcon && modelValue }"
      @click="$emit('actionClick')"
    >
      <Icon :name="actionIcon" :size="18" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/component-library/Icon.vue'
import { computed } from 'vue'

export interface Props {
  placeholder?: string
  name: string
  type: string
  disabled?: boolean
  modelValue: string
  icon?: string
  actionIcon?: string
}

defineEmits(['update:modelValue', 'actionClick'])

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Some text',
  type: 'text',
  disabled: false,
  icon: '',
  actionIcon: '',
})

const inputClasses = computed(() => ({
  '-disabled': props.disabled,
}))
</script>

<style lang="scss">
.input-container {
  width: 100%;
  &.-with-icon {
    input {
      padding-left: 5rem;
      padding-right: 2.5rem;
    }
  }
}
.input {
  width: 100%;
  height: 5rem;
  padding: 2rem;
  border: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-color: var(--color-black-900);
  outline: transparent;
  border-radius: 1rem;
  font-family: var(--text-font-extra-bold), sans-serif;
  color: var(--color-black-50);
  font-size: 1.7rem;
  transition: box-shadow 0.5s;
  position: relative;
}

.input-icon-wrapper {
  position: absolute;
  left: 1rem;
  top: 58%;
  z-index: 1;
  transform: translateY(-50%);
  svg {
    path {
      stroke: var(--color-black-50);
    }
  }
}
.input-action-icon-wrapper {
  position: absolute;
  right: 1rem;
  top: 58%;
  z-index: 1;
  transform: translateY(-50%) scale(1.2);
  opacity: 0;
  visibility: hidden;
  transition: visibility 0.3s, opacity 0.3s cubic-bezier(0, 0.55, 0.45, 1),
    transform 0.5s cubic-bezier(0, 0.55, 0.45, 1);
  svg {
    path {
      stroke: var(--color-black-50);
    }
  }
  &.-visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(-50%) scale(1);
  }
}
</style>
