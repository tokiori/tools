<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ t(localeKey.transcript.pageTitle, {lang:locale}) }}
        <DialogButton label="Setting">
          <template v-slot:contents="props">
            <v-card>
              <v-card-text>
                <v-select
                  v-model="locale"
                  :items="loadedLocales"
                  item-title="title"
                  item-value="id"
                  label="表示言語"
                  persistent-hint
                  single-line
                  density="compact"
                  hide-details="auto"
                ></v-select>
                <v-select
                  v-model="speechSynthesisStore.voice"
                  :items="speechSynthesisStore.voices"
                  item-title="name"
                  item-value="name"
                  label="読み上げ音声"
                  persistent-hint
                  single-line
                  density="compact"
                  hide-details="auto"
                ></v-select>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  variant="text"
                  @click="props.showDialog = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </DialogButton>
      </v-card-title>
      <v-card-text>
        <p>
          {{ t(localeKey.transcript.executeTitle) }}
        </p>
        <p v-for="d in data">
          {{ d.datetime.toDateString() }} : {{ d.text }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="transcriptStart(true)">開始</v-btn>
        <v-btn @click="transcriptStop()">終了</v-btn>
        <v-spacer></v-spacer>
        <v-select
          v-model="speechSynthesisStore.voice"
          :items="speechSynthesisStore.voices"
          item-title="name"
          item-value="name"
          label="読み上げ音声"
          persistent-hint
          single-line
          density="compact"
          hide-details="auto"
        >
        </v-select>
        <v-btn @click="speakSample()">読み上げサンプル</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mt-2">
      <v-card-title>
        SETUP HISTORY
      </v-card-title>
      <v-card-text>
        <caption>
          install
        </caption>
        <v-code>
          npm install --save @types/dom-speech-recognition
        </v-code>
        <caption class="mt-2">
          tsconfig.json
        </caption>
        <v-code>
          <pre>
"compilerOptions": {
  "types": [
    "dom-speech-recognition",
  ],
}
          </pre>
        </v-code>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { loadedLocales, localeKey } from "@/plugins/i18n";
import { useSpeechRecognitionStore } from "@/store/speechRecognitionStore";
import { useSpeechSynthesisStore } from "@/store/speechSynthesisStore";
import DialogButton, { DialogButtonProps } from "@/components/DialogButton.vue"
const { locale, t } = useI18n();
const data = reactive<TranscriptData[]>([]);

type TranscriptData = {
  datetime: Date;
  text: string;
};

const speechRecognitionStore = useSpeechRecognitionStore();
const speechSynthesisStore = useSpeechSynthesisStore();

onMounted(async ()=>{
  await speechSynthesisStore.init();
  speechRecognitionStore.setup((event) => {
    const dt = new Date();
    data.push({
      datetime: dt,
      text: event.results[0][0].transcript,
    });
    // data.push(`[${dt}]${event.results[0][0].transcript}`);
  });
});

const transcriptStart = (recursive: boolean) => {
  speechRecognitionStore.start({continue:recursive});
}
const transcriptStop = () => {
  speechRecognitionStore.stop();
}
const speakSample = () => {
  speechSynthesisStore.speak("読み上げサンプルです");
}
</script>

<style scoped lang="scss">
</style>
