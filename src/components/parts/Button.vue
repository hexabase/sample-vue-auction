<template>
  <button :disabled="disabled" @click="clickHandler">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "FormButton",
  props: {
    disabled: Boolean
  },
  methods: {
    clickHandler: function(e) {
      if (this.disabled) {
        return;
      }
      this.$emit("click", e);
    }
  }
};
</script>
