import {
  ValidationObserver,
  ValidationProvider,
  localize,
  extend,
  setInteractionMode
} from "vee-validate";
import {
  required,
  email,
  digits,
  numeric,
  max_value,
  min_value,
  is
} from "vee-validate/dist/rules";
import ja from "vee-validate/dist/locale/ja.json";

//チェックイベントのカスタマイズ
setInteractionMode("custom", context => {
  if (context.value === "yes") {
    //コンテキストの内容によってカスタマイズする
    //return {
    //on: ["input"]
    //};
  }
  return {};
});

// 拡張条件作成
const phone = {
  message: "{_field_}は電話番号を入力してください。",
  changed: false,
  dirty: false,
  validated: false,
  validate(value) {
    const match = "^[0-9-]+$";
    return value.match(match) ? true : false;
  }
};

// 拡張条件設定
const doubleBite = {
  message: "{_field_}は全角文字で入力してください。",
  changed: false,
  dirty: false,
  validated: false,
  validate(value) {
    var result = true;
    const match = "^[^\x01-\x7E\xA1-\xDF]+$";
    return value.match(match) ? true : false;
  }
};
// 半角カナ
const halfKana = {
  message: "{_field_}は半角カナ文字で入力してください。",
  changed: false,
  dirty: false,
  validated: false,
  validate(value) {
    var result = true;
    const match = "^[ｦ-ﾟ]*$";
    return value.match(match) ? true : false;
  }
};
// 全角カナ
const fullKana = {
  message: "{_field_}は全角カナ文字で入力してください。",
  changed: false,
  dirty: false,
  validated: false,
  pristine: false,
  validate(value) {
    var result = true;
    const match = "^[ァ-ヶー　]+$";
    return value.match(match) ? true : false;
  }
};
// 郵便番号
const address = {
  message: "{_field_}は郵便番号の形式で入力してください。",
  changed: false,
  dirty: false,
  validated: false,
  validate(value) {
    var result = true;
    const match = "^\\d{3}-\\d{4}$";
    return value.match(match) ? true : false;
  }
};
// 文字数カウント
const doubleCount = {
  message: "{_field_}は{str}以下の文字数で入力してください。",
  params: ["str"],
  changed: false,
  dirty: false,
  validated: false,
  validate(value, { str }) {
    var result = true;
    const count = value.length;
    return count <= parseInt(str) ? true : false;
  }
};
// 文字数範囲
const doubleRange = {
  message: "{_field_}は{min}以上{max}以下の文字数で入力してください。",
  params: ["min", "max"],
  changed: false,
  dirty: false,
  validated: false,
  validate(value, { min, max }) {
    var result = true;
    const count = value.length;
    return count >= parseInt(min) && count <= parseInt(max) ? true : false;
  }
};
// 全角文字のみ
const doubleText = {
  message: "{_field_}は全角文字のみで入力してください。",
  changed: false,
  dirty: false,
  validated: false,
  touched: false,
  validate(value) {
    var result = true;
    const match = "[^\\x01-\\x7E]";
    if (!value.match(match)) result = false;
    if (value.match("[ｦ-ﾟ]+")) result = false;
    if (value.match("[ -~]+")) result = false;
    return result;
  }
};
// paswordポリシー（半角英数）
const passhalfs = {
  message: "{_field_}は半角英数または記号のみで入力してください。",
  changed: false,
  dirty: false,
  validated: false,
  touched: false,
  validate(value) {
    var result = true;
    const match = "^[¥x20-¥x7F]+$";
    if (!value.match(match)) result = false;
    return result;
  }
};
//passwordポリシー（種類）
const passtypes = {
  message:
    "{_field_}は半角英字、半角数字、半角記号いずれか2種類以上で入力してください。",
  changed: false,
  dirty: false,
  validated: false,
  touched: false,
  validate(value) {
    var result = true;
    const match =
      "^.*((?=.*[A-Za-z])(?=.*[0-9])|(?=.*[A-Za-z])(?=.*[!_@])|(?=.*[0-9])(?=.*[!_@])).*$";
    if (!value.match(match)) result = false;
    return result;
  }
};
// pdfのみ
const pdf = {
  message: "{_field_}にはPDFファイルを選択してください。",
  changed: false,
  dirty: false,
  validated: false,
  touched: false,
  validate(value) {
    var result = true;
    for (var no in value) {
      var file = value[no];
      var foundIdx = file.name.lastIndexOf(".");
      if (foundIdx === -1) return false;
      else {
        var fileName = file.name.slice(foundIdx + 1).toLowerCase();
        if (fileName != "pdf") return false;
      }
    }
    return result;
  }
};

// ファイル数
const maxFile = {
  message: "{_field_}には{str}つ以下のファイルを選択してください。",
  params: ["str"],
  changed: false,
  dirty: false,
  validated: false,
  touched: false,
  validate(value, { str }) {
    var result = true;
    result = value.length <= parseInt(str);
    return result;
  }
};
// 拡張条件設定
extend("required", {
  ...required,
  changed: false,
  dirty: false,
  validated: false
});
extend("numeric", numeric);
extend("digits", digits);
extend("email", {
  ...email,
  message: "{_field_}はメールアドレスの形式ではありません。"
});
extend("is", {
  ...is,
  message: "{_field_}と口座毎の振込金額の合計が異なります。"
});
extend("max_value", max_value);
extend("min_value", min_value);
// 電話番号
extend("phone", phone);
extend("decimal", {
  validate: (value, { decimals = "*", separator = "." } = {}) => {
    if (value === null || value === undefined || value === "") {
      return {
        valid: false
      };
    }
    if (Number(decimals) === 0) {
      return {
        valid: /^-?\d*$/.test(value)
      };
    }
    const regexPart = decimals === "*" ? "+" : `{1,${decimals}}`;
    const regex = new RegExp(
      `^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`
    );
    return {
      valid: regex.test(value),
      data: {
        serverMessage: "{_field_}は半角数値で入力してください。"
      }
    };
  },
  message: `{_field_}は半角数値で入力してください`
});
// 全角文字
extend("doubleBite", doubleBite);
// 半角カナ
extend("halfKana", halfKana);
// 全角カナ
extend("fullKana", fullKana);
// 郵便番号
extend("address", address);
// 文字数カウント
extend("doubleCount", doubleCount);
// 全角文字のみ
extend("doubleText", doubleText);
// PDFファイル
extend("pdf", pdf);
// 1ファイルのみ
extend("maxFile", maxFile);
// パスワード（半角英数記号のみ）
extend("passHalfs", passhalfs);
// パスワード（種類）
extend("passTypes", passtypes);
// 文字数範囲
extend("doubleRange", doubleRange);
// ローカライズ設定(日本語)
localize("ja", ja);

// Vueに対しvalidationコンポーネントの設定
export default {
  install(Vue) {
    Vue.component("ValidationProvider", ValidationProvider);
    Vue.component("ValidationObserver", ValidationObserver);
  }
};
