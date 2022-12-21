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
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Icon from "@/components/component-library/Icon.vue";

export interface Props {
  placeholder?: string;
  name: string;
  type: string;
  disabled?: boolean;
  modelValue: string;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Some text",
  type: "text",
  disabled: false,
  icon: "",
});

const inputClasses = computed(() => ({
  "-disabled": props.disabled,
}));
</script>

<style lang="scss">
.input-container {
  width: 100%;
  &.-with-icon {
    input {
      padding-left: 5rem;
    }
  }
}
.input {
  width: 100%;
  height: 5rem;
  padding: 2rem;
  border: transparent;
  -webkit-appearance: none;
  background-color: var(--color-black-900);
  outline: transparent;
  border-radius: 1rem;
  font-family: var(--text-font-extra-bold);
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
</style>
