<template>
  <div class="formItem">
    <div class="formItem_title">
      {{ title }}
      <span v-if="required" class="formItem_required">※</span>
    </div>
    <div class="formItem_body fileUpload">
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
            outlined
            dense
            :accept="accept"
            :value="value"
            :error-messages="errors"
            :disabled="!editable"
            :clearable="clearable"
            @change="changeValue($event, id)"
          >
            <template v-slot:selection="{ text }">
              <v-chip small label>{{ text }}</v-chip>
            </template>
          </v-file-input>
          <p v-if="fileImage.length > 0" class="fileUpload_img">
            <img :src="fileImage" />
          </p>
          <p v-if="text" class="fileUpload_text">{{ text }}</p>
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
    id: {
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
    },
    text: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      fileImage: [],
      errors: "",
      clearable: false
    };
  },
  methods: {
    changeValue(value, name) {
      console.log(value);
      if (value && value.length > 0) {
        this.errors = "";
        const files = value;
        const file = event.target.files[0];
        const fileName = file.name;
        const fileSize = file.size;
        const fileType = file.type;

        //上限サイズは3MB
        if (fileSize > 3000000) {
          this.errors += "ファイルの上限サイズ3MBを超えています\n";
        }

        //拡張子は .jpg .gif .png . pdf のみ許可
        if (
          fileType != "image/jpeg" &&
          fileType != "image/gif" &&
          fileType != "image/png" &&
          fileType != "application/pdf"
        ) {
          this.errors +=
            ".jpg、.gif、.png、.pdfのいずれかのファイルのみ許可されています\n";
        }

        if (this.errors) {
          //errorsが存在する場合は内容をalert
          alert(this.errors);
          //valueを空にしてリセットする
          event.currentTarget.value = null;
          this.fileImage = null;
          let formData = new FormData();
          formData.append("id", name);
          formData.append("file", "");
          formData.append("filename", "");
          this.$emit("change", { value: formData, name: name });
          return;
        }
        this.createImage(files[0]);
        let formData = new FormData();
        formData.append("id", name);
        formData.append("file", files[0]);
        formData.append("filename", files[0].name);
        this.$emit("change", { value: formData, name: name });
      }
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
