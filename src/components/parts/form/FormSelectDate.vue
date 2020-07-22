<template>
  <div class="formItem">
    <div class="formItem_title">
      {{ title }}
      <span v-if="required" class="formItem_required">※</span>
    </div>
    <div class="formItem_body">
      <div class="formItem_itemWrap">
        <validation-provider
          v-slot="{ errors }"
          name="year"
          :rules="valrule"
          class="select-year"
        >
          <v-select
            v-model="year"
            :items="getYears()"
            dense
            outlined
            single-line
            label="選択してください"
            :value="value"
            :disabled="!editable"
            :error-messages="errors"
            :change="modify"
            suffix="年"
            @input="inputValue"
          >
          </v-select>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="month"
          :rules="valrule"
          class="select-month"
        >
          <v-select
            v-model="month"
            :items="months"
            dense
            outlined
            single-line
            label=""
            :value="value"
            :disabled="!editable"
            :error-messages="errors"
            :change="modify"
            suffix="月"
            @input="inputValue"
          >
          </v-select>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="day"
          :rules="valrule"
          class="select-day"
        >
          <v-select
            v-model="date"
            :items="getDates(year, month)"
            dense
            outlined
            single-line
            label=""
            :value="value"
            :disabled="!editable"
            :error-messages="errors"
            suffix="日"
            @input="inputValue"
          >
          </v-select>
        </validation-provider>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

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
    // 汎用コンポーネントとしたいため、typeチェックとdefaultの指定が出来ない
    // => 複数選択の有無でvalueで引き渡される値と初期値が変わるため
    // eslint-disable-next-line
    value: {},
    valrule: {
      type: String,
      default: ""
    },
    birthday: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    };
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
    },
    year: {
      get: function() {
        return this.birthday ? moment(this.birthday).year() : "";
      }
    },
    month: {
      get: function() {
        return this.birthday ? moment(this.birthday).month() + 1 : "";
      }
    },
    date: {
      get: function() {
        return this.birthday ? moment(this.birthday).date() : "";
      }
    }
  },
  methods: {
    inputValue: function(e) {
      this.$emit("input", e);
    },
    getYears: function() {
      const goBackYears = 10;
      const currentYear = moment().year();
      const startYear = currentYear - goBackYears;
      return [...Array(goBackYears + 1).keys()].map(x => x + startYear);
    },
    getDates: function(year, month) {
      if (year && month) {
        const maxDate = this.getFinalDate(year, month);
        return [...Array(maxDate).keys()].map(x => x + 1);
      }
    },
    modify: function() {
      // 年や月が変更されたとき、日が存在しなくなる場合があるので調整する。
      // 例: 2018-12-31 を選択していて月が 12 から 2 に変更された場合、日を 28 にする。
      if (!moment([this.year, this.month - 1, this.date]).isValid()) {
        this.date = this.getFinalDate(this.year, this.month);
      }
    },
    getFinalDate: function(year, month) {
      // 月末日
      return moment([year, month - 1])
        .endOf("month")
        .date();
    }
  }
};
</script>
