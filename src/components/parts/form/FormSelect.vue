<template>
  <div class="formItem">
    <div class="formItem_title">
      {{ title }}
      <span v-if="required" class="formItem_required">※</span>
    </div>
    <div class="formItem_body">
      <validation-provider v-slot="{ errors }" :name="title" :rules="valrule">
        <v-select
          :items="items"
          dense
          outlined
          single-line
          label="選択してください"
          :hint="hint"
          :multiple="multiple"
          :value="value"
          :readonly="!editable"
          :error-messages="errors"
          @input="inputValue"
        >
          <template v-if="multiple" v-slot:prepend-item>
            <v-list-item ripple @click="toggle">
              <v-list-item-action>
                <v-icon :color="value.length > 0 ? 'indigo darken-4' : ''">
                  {{ icon }}
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>すべて選択</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2"></v-divider>
          </template>
        </v-select>
      </validation-provider>
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
    editable: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    // 汎用コンポーネントとしたいため、typeチェックとdefaultの指定が出来ない
    // => 複数選択の有無でvalueで引き渡される値と初期値が変わるため
    // eslint-disable-next-line
    value: {},
    valrule: {
      type: String,
      default: ""
    },
    hint: {
      type: String,
      default: undefined
    }
  },
  computed: {
    likesAll() {
      return this.value.length === this.items.length;
    },
    likesSome() {
      return this.value.length > 0 && !this.likesAll;
    },
    icon() {
      if (this.likesAll) return "mdi-close-box";
      if (this.likesSome) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    }
  },
  methods: {
    inputValue: function(e) {
      this.$emit("input", e);
    },
    toggle() {
      this.$nextTick(() => {
        if (this.likesAll) {
          this.$emit("input", []);
        } else {
          this.$emit("input", this.items.slice());
        }
      });
    }
  }
};
</script>
