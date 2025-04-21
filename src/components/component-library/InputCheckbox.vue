<template>
  <div class="input-checkbox-container">
    <label class="input-checkbox text -bold" :class="{ '-checked': checked }">
      <input
        class="input"
        type="checkbox"
        :name="name"
        :value="value"
        v-model="model"
      />
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, toRefs } from 'vue'
export interface Props {
  name: string
  disabled?: boolean
  value: string
  label: string
  modelValue: string[]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  label: 'Some label',
})
const { name, modelValue, value } = toRefs(props)
const emit = defineEmits(['update:modelValue'])
const checked = computed(() => modelValue.value.includes(value.value))
const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<style lang="scss">
.input-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  border: transparent;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  box-shadow: 0 0 0 0.3rem var(--color-black-700);
  background-color: var(--color-black-50);
  color: var(--color-black-950);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  input {
    position: fixed;
    opacity: 0;
    pointer-events: none;
  }
  &.-checked {
    box-shadow: 0 0 0 0.3rem var(--color-black-700);
    background-color: var(--color-black-950);
    color: var(--color-black-50);
  }
}
</style>
