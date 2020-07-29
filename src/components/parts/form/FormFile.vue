<template>
  <div class="formItem">
    <div class="formItem_title">
      {{ title }}
      <span v-if="required" class="formItem_required">※</span>
    </div>
    <div class="formItem_body">
      <template v-if="editable">
        <validation-provider
          ref="provider"
          v-slot="{ errors }"
          :name="title"
          :rules="valrule"
        >
          <!-- 編集モード -->
          <v-file-input
            ref="file"
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
            @change="changeValue($event, title)"
          >
            <template v-slot:selection="{ text }">
              <v-chip small label>{{ text }}</v-chip>
            </template>
          </v-file-input>
          <p>
            <img :src="fileImage" />
          </p>
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
    </div>
  </div>
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
  data() {
    return {
      data: {},
      fileImage: []
    };
  },
  methods: {
    changeValue(value, name) {
      const files = value;
      this.createImage(files[0]);
      let formData = new FormData();
      formData.append("id", name);
      formData.append("file", files[0]);
      formData.append("filename", files[0].name);
      this.$emit("change", { value: formData, name: name });
    },
    // アップロードした画像を表示
    createImage(file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.fileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    preview(file) {
      const url = URL.createObjectURL(file);
      window.open(url);
    }
  }
};
</script>
