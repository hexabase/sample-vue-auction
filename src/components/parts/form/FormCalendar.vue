<template>
  <div class="formItem">
    <div class="formItem_title">
      {{ title }}
      <span v-if="required" class="formItem_required">※</span>
    </div>
    <div class="formItem_body">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <validation-provider
            ref="provider"
            v-slot="{ errors }"
            :name="title"
            :rules="valrule"
          >
            <v-text-field
              v-model="displayDate"
              readonly
              :clearable="isclearable"
              outlined
              dense
              single-line
              :disabled="!editable"
              :error-messages="errors"
              label="日付を選択"
              class="mt-3"
              v-on="on"
              @click:clear="date = null"
            ></v-text-field>
          </validation-provider>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          locale="jp-ja"
          :day-format="value => new Date(value).getDate()"
          @input="inputValue"
        ></v-date-picker>
      </v-menu>
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
    value: {
      type: String,
      default: ""
    },
    valrule: {
      type: String,
      default: ""
    },
    isclearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menu: false,
      date: "",
      displayDate: ""
    };
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.displayDate = this.$moment.format2YmdJP(this.value);
        this.date = this.$moment.format2Ymd(this.value);
      }
    }
  },
  methods: {
    inputValue: function(e) {
      this.displayDate = this.$moment.format2YmdJP(e);
      this.date = this.$moment.format2Ymd(e);
      this.menu = false;
      this.$emit("input", this.$moment.format2Iso(e));
    }
  }
};
</script>
