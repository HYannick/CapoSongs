<template>
  <div class="input-radio-container">
    <label
      class="input-radio text -bold"
      :class="{ '-checked': checked }"
    >
      <input
        class="input"
        type="radio"
        :name="name"
        :value="value"
        @input="updateValue"
      />
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";

export interface Props {
  name: string;
  disabled?: boolean;
  value: string;
  label: string;
  modelValue: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  label: "Some label",
});
const { name, modelValue, value } = toRefs(props);

const checked = computed(() => modelValue.value === value.value);
const emits = defineEmits(["update:modelValue"]);


const updateValue = ($event: any) => {
  emits("update:modelValue", $event.target.value);
};


</script>

<style lang="scss">
.input-radio-container {
  width: 100%;
}

.input-radio {
  display: flex;
  align-items: center;
  justify-content: center;
  border: transparent;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  min-width: 15rem;
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
