<template>
  <Modal @onClose="hideSupport">
    <div class="support-container">
      <h4 class="text -title-2 -black">{{ t("support.title") }}</h4>
      <hr />
      <p class="text -body">
        {{ t("support.heading") }}
      </p>
      <form class="support-form">
        <select name="subject" v-model="form.type">
          <option value="">{{ t("support.options.default") }}</option>
          <option :value="t('support.options.technical')">
            {{ t("support.options.technical") }}
          </option>
          <option :value="t('support.options.request')">
            {{ t("support.options.request") }}
          </option>
          <option :value="t('support.options.typo')">
            {{ t("support.options.typo") }}
          </option>
          <option :value="t('support.options.contribute')">
            {{ t("support.options.contribute") }}
          </option>
          <option :value="t('support.options.feature')">
            {{ t("support.options.request") }}
          </option>
          <option :value="t('support.options.feedback')">
            {{ t("support.options.feedback") }}
          </option>
        </select>
        <textarea
          name="body"
          :placeholder="t('support.textarea.placeholder')"
          v-model="form.details"
        ></textarea>
        <div class="support-form-footer">
          <button class="support-button-cancel" @click.prevent="hideSupport">
            {{ t("support.buttons.cancel") }}
          </button>
          <button class="support-button-submit" @click.prevent="sendMail">
            {{ t("support.buttons.submit") }}
          </button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app.store";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import Modal from "@/components/common/Modal.vue";

const { hideSupport } = useAppStore();
const { t } = useI18n();

const form = ref({
  type: "",
  details: "",
});

const mailTo = computed(
  () =>
    `mailto:fococapoeiramusicas@gmail.com?subject=${form.value.type}&body=${form.value.details}`
);

const sendMail = () => {
  const mailingLink = document.createElement("a");
  mailingLink.classList.add("mailer");
  mailingLink.setAttribute("href", mailTo.value);
  mailingLink.click();
  mailingLink.remove();
  hideSupport();
};
</script>

<style lang="scss">
.support-container {
  hr {
    margin: 1.5rem 0;
    height: 0.2rem;
    background: rgba(var(--color-primary-950-rgb), 0.1);
    border-radius: 2rem;
    border: none;
  }
  h4 {
    margin-bottom: 0;
  }
  p {
    margin: 1rem 0;
  }
}
.support-form {
  select {
    border: transparent;
    padding: 1rem;
    border-radius: 1rem;
    font-weight: bold;
    outline: transparent;
    margin-bottom: 1.5rem;
    width: 100%;
    box-shadow: inset 0 0 0 0.2rem var(--color-black-200);
  }

  textarea {
    border: transparent;
    padding: 1rem;
    border-radius: 1rem;
    width: 100%;
    min-height: 20rem;
    outline: transparent;
    box-shadow: inset 0 0 0 0.2rem var(--color-black-200);
  }

  &-footer {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    margin-top: 1rem;
  }

  button {
    border: none;
    display: block;
    font-weight: bold;
    border-radius: 1rem;
    padding: 1.5rem;
    font-size: 1.6rem;
    flex: 1;
    cursor: pointer;
  }

  .support-button-submit {
    background-color: var(--color-black-900);
    color: var(--color-black-50);
  }

  .support-button-cancel {
    background-color: var(--color-background);
    box-shadow: inset 0 0 0 0.2rem var(--color-black-900);
    color: var(--color-black-950);
  }
}
</style>
