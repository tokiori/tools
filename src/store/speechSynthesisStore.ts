import { resolve } from 'path';
import { defineStore } from 'pinia'
import { computed } from 'vue';

type SpeechSynthesisStore = {
  lang: "de-DE"|"en-GB"|"en-US"|"es-ES"|"es-US"|"fr-FR"|"hi-IN"|"id-ID"|"it-IT"|"ja-JP"|"ko-KR"|"nl-NL"|"pl-PL"|"pt-BR"|"ru-RU"|"zh-CN"|"zh-HK"|"zh-TW"|undefined;
  instance: SpeechSynthesis | undefined;
  /** 選択音声 */
  voice?: SpeechSynthesisVoice["name"];
  voices: SpeechSynthesisVoice[];
}
export const useSpeechSynthesisStore = defineStore('useSpeechSynthesisStore', {
  state: (): SpeechSynthesisStore => ({
    lang: undefined,
    instance: undefined,
    voice: undefined,
    voices: [],
  }),
  actions : {
    async init() {
      await this.getInstance();
      this.instance = window.speechSynthesis;
      this.voices = this.instance.getVoices();
      this.voice = this.voices.find((v)=>v.default)?.name;
      console.dir(this.voices);
      console.log(this.voices.map(v=>v.lang).join("\r\n"));
      // if(this.lang) this.instance.lang = this.lang;
    },
    getInstance():Promise<SpeechSynthesis> {
      return new Promise(
          function (resolve, reject) {
            const synth = window.speechSynthesis;
            const id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    resolve(synth);
                    clearInterval(id);
                }
            }, 100);
          }
      )
    },
    setup() {
      // this.instance = window.speechSynthesis;
      // if(this.lang) this.instance.lang = this.lang;
    },
    speak(text: string){
      if(!this.instance) {
        return;
      }
      const utterThis = new SpeechSynthesisUtterance(text);
      const voice:SpeechSynthesisVoice|undefined = this.voices.find(v=>v.name===this.voice);
      if(voice){
        utterThis.voice = voice;
      }
      this.instance.speak(utterThis);
    },
  },
});
