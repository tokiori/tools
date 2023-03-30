import { defineStore } from 'pinia'

type SpeechRecognitionStore = {
  lang: "ja-JP"|"en-US"|"en-GB"|"zh-CN"|"ko-KR"|undefined;
  instance: SpeechRecognition | undefined;
}
type SpeechRecognitionOptions = {
  continue?: boolean;
  mode?: "speech"|"sound"|"audio";
}

export const useSpeechRecognitionStore = defineStore('useSpeechRecognitionStore', {
  state: (): SpeechRecognitionStore => ({
    lang: undefined,
    instance: undefined,
  }),
  actions : {
    setup(callback:(event: SpeechRecognitionEvent)=>void) {
      const speechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      this.instance = new speechRecognition();
      // continuous:true デフォルトでは1回認識したら終了するので継続させる
      // が、時間経過で途切れるので終了イベントをハンドリングして再開させるのがスマート
      // recognition.continuous = true;
      if(this.lang) this.instance.lang = this.lang;
      this.instance.onresult = (event) => {
        callback(event);
      }
    },
    start(options: SpeechRecognitionOptions){
      // const _start = (mode: SpeechRecognitionOptions["mode"]) => {
      //   if(!this.instance) return;
      //   if(!mode) this.instance?.start();
      //   if(mode=="sound") this.instance.onsoundstart();
      //   if(mode=="sound") this.instance.onaudiostart();
      //   if(mode=="speech") this.instance.onspeechstart();
      // }
      if(!this.instance) {
        return;
      }
      this.instance.start();
      if(options && options.continue){
        this.instance.onend = () => {
          this.instance?.start();
        }
      }
    },
    stop(){
      if(!this.instance) {
        return;
      }
      this.instance.onend = null;
      this.instance.stop();
    },
  },
});
