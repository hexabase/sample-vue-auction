<template>
  <v-row align="center" justify="center" align-content="center">
    <v-col cols="3">
      <p>
        {{ title }}
        <span v-if="required" class="red--text">※</span>
      </p>
    </v-col>
    <v-col cols="8">
      <template v-if="editable">
        <validation-provider
          ref="provider"
          v-slot="{ errors }"
          :name="title"
          :rules="valrule"
        >
          <!-- 編集モード -->
          <v-file-input
            single-line
            label="選択されていません"
            multiple
            clearable
            outlined
            dense
            :accept="accept"
            :value="value"
            :error-messages="errors"
            :disabled="!editable"
            @change="changeValue"
          >
            <template v-slot:selection="{ text }">
              <v-chip small label>{{ text }}</v-chip>
            </template>
          </v-file-input>
        </validation-provider>
      </template>
      <template v-else>
        <!-- 閲覧モード -->
        <span v-for="(file, index) in value" :key="index" class="mx-2">
          <v-chip label color="primary" @click="preview(file)">
            {{ file.name }}
          </v-chip>
        </span>
      </template>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: ""
    },
    editable: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      default: () => []
    },
    valrule: {
      type: String,
      default: ""
    }
  },
  methods: {
    changeValue: function(e) {
      this.$emit("change", e);
    },
    preview(file) {
      const url = URL.createObjectURL(file);
      window.open(url);
    }
  }
};
</script>
