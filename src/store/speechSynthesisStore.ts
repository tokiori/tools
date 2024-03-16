import { defineStore } from 'pinia'
import { computed, ref, Ref } from 'vue';

type SpeechSynthesisStore = {
  lang: "de-DE"|"en-GB"|"en-US"|"es-ES"|"es-US"|"fr-FR"|"hi-IN"|"id-ID"|"it-IT"|"ja-JP"|"ko-KR"|"nl-NL"|"pl-PL"|"pt-BR"|"ru-RU"|"zh-CN"|"zh-HK"|"zh-TW"|undefined;
  instance: SpeechSynthesis | undefined;
  /** 選択音声 */
  voice?: SpeechSynthesisVoice["name"];
  voices: SpeechSynthesisVoice[];
  status: "play"|"pause"|"stop";
  forceCancel?: boolean;
}
export const useSpeechSynthesisStore = defineStore('useSpeechSynthesisStore', {
  state: (): SpeechSynthesisStore => ({
    lang: undefined,
    instance: undefined,
    voice: undefined,
    voices: [],
    status: "stop",
  }),
  actions : {
    async init() {
      await this.getInstance();
      this.instance = window.speechSynthesis;
      this.voices = this.instance.getVoices();
      this.voice = this.voices.find((v)=>v.default)?.name;
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
    setStatus(){
      if(!this.instance){
        this.status = "stop";
      }else if(this.instance.paused){
        this.status = "pause";
      }else if(this.instance.speaking){
        this.status = "play";
      }else{
        this.status = "stop";
      }
    },
    speak(text: string){
      if(!this.instance) {
        return;
      }
      const utterThis = new SpeechSynthesisUtterance(text);
      const voice:SpeechSynthesisVoice|undefined = this.voices.find(v=>v.name===this.voice);
      if(voice){
        utterThis.voice = voice;
        utterThis.pitch = 1;
      }
      utterThis.onstart = (event) => {
        console.log(`SpeechSynthesisUtterance.onstart()`);
        this.status = "play";
      };
      utterThis.onpause = (event) => {
        console.log(`SpeechSynthesisUtterance.onpause()`);
        this.status = "pause";
      };
      utterThis.onresume = (event) => {
        console.log(`SpeechSynthesisUtterance.onresume()`);
        this.status = "play";
        console.log(`useSpeechSynthesisStore.forceCancel:${this.forceCancel}`);
        if(this.forceCancel) {
          this.forceCancel = false;
          this.cancel();
          this.status = "stop";
          console.log(`useSpeechSynthesisStore.status:${this.status}`);
        }
      };
      utterThis.onend = (event) => {
        console.log(`SpeechSynthesisUtterance.onend()`);
        console.log(`Utterance has finished being spoken after ${event.elapsedTime} seconds.`);
        this.status = "stop";
      };
      this.instance.speak(utterThis);
      this.setStatus();
      console.log("useSpeechSynthesisStore.speak()")
    },
    pause(){
      if(!this.instance) {
        return;
      }
      this.instance.pause();
      this.setStatus();
      console.log("useSpeechSynthesisStore.pause()")
    },
    resume(){
      this.instance?.resume();
      this.setStatus();
      console.log("useSpeechSynthesisStore.resume()")
    },
    cancel(){
      if(this.status == "pause"){
        this.forceCancel = true;
        this.resume();
      }else{
        this.forceCancel = false;
        this.instance?.cancel();
      }
      this.setStatus();
      console.log("useSpeechSynthesisStore.cancel()")
    },
  },
});
