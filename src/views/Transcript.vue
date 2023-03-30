<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ t(localeKey.transcript.pageTitle, {lang:locale}) }}
      </v-card-title>
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
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { loadedLocales, localeKey } from "@/plugins/i18n";
const { locale, t } = useI18n();

</script>

<style scoped lang="scss">
</style>
