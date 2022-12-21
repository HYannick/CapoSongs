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
import { computed, ref, toRefs, watch } from "vue";

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

input[type="radio"] {
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  background-color: var(--form-background);
  /* Not removed via appearance */
  margin: 0;

  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 50%;
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform cubic-bezier(0.83, 0, 0.17, 1);
  box-shadow: inset 1em 1em var(--form-control-color);
  /* Windows High Contrast Mode */
  background-color: red;
}

input[type="radio"]:checked::before {
  transform: scale(1);
}

input[type="radio"]:focus {
  outline: max(2px, 0.15em) solid currentColor;
  outline-offset: max(2px, 0.15em);
}
</style>
