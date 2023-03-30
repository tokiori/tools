// ./src/i18n/index.ts
import { createI18n, useI18n } from "vue-i18n";
import { lang as ja } from "@/locales/lang-ja"
import { lang as en } from "@/locales/lang-en"
import { ToLocales } from "@/models/locale_model";
// import { computed } from "vue";
// import messages from "@intlify/vite-plugin-vue-i18n/messages";

// https://vue-i18n.intlify.dev/guide/installation.html
// https://github.com/intlify/vue-i18n-next/blob/master/examples/ssr/vite/src/i18n.js

const messages = {
  ja,
  en,
}

type LocaleSelector = {
  id: string;
  title: string;
  data: ToLocales;
}
export const loadedLocales:LocaleSelector[] = [
  {id:"ja", data:ja, title:"日本語"},
  {id:"en", data:en, title:"English"},
]

export const i18n = createI18n({
  locale: "ja", // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
  legacy: false,
});

/** Localeバインダー作成（useI18n.tで利用可能な取得キーを構築） */
const getLocaleKeys = () => {
  // 引数パラメータはどのLocaleでもよい
  // Value参照はなく、キーを結合してi18n.tで取得可能なKeyValueを生成するため
  const map = getLocaleKeyValue(ja);
  return JSON.parse(JSON.stringify(map)) as ToLocales
};
const getLocaleKeyValue = (input: any, prefix?: string) => {
  const obj:{ [key: string]: string | {} } = {};
  Object.keys(input).forEach((val:string, i:number)=>{
    if (typeof input[val] == "string") {
      const joinval = (prefix? prefix+"." : "") + val;
      obj[val] = joinval;
    } else {
      obj[val] = getLocaleKeyValue(input[val], val);
    }
  });
  return obj;
};
/** Localeバインダー（useI18n.tで利用可能な取得キー） */
export const localeKey = getLocaleKeys();
