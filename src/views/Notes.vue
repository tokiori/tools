<template>
  <v-container>
    <v-card>
      <v-card-title>
        Notes (create vuetify project)
      </v-card-title>
      <v-card-text>
        <v-code>
          <pre>
> npm create vuetify
Need to install the following packages:
  create-vuetify@1.0.6
Ok to proceed? (y) <span class="choose">y</span>

Vuetify.js - Material Component Framework for Vue

√ Project name: ... <span class="choose">{{projectName}}</span>
√ Which preset would you like to install? » <span class="choose">Essentials (Vuetify, VueRouter, Pinia)</span>
√ Use TypeScript? ... No / <span class="choose">Yes</span>
√ Would you like to install dependencies with yarn, npm, or pnpm? » <span class="choose">npm</span>

◌ Generating scaffold...
◌ Installing dependencies with npm...

Discord community: https://community.vuetifyjs.com
Github: https://github.com/vuetifyjs/vuetify
Support Vuetify: https://github.com/sponsors/johnleider
          </pre>
        </v-code>
      </v-card-text>
    </v-card>
    <v-card class="mt-3">
      <v-card-title>Vuetify3</v-card-title>
      <template  v-for="link in vuetifyLinks">
        <v-card-item>
          <v-card-subtitle>{{ link.text }}</v-card-subtitle>
          <template  v-for="page in link.page">
            <v-card-text><a :href="page">{{ page }}</a></v-card-text>
          </template>
        </v-card-item>
      </template>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
const projectName="vuetify-project";
type LinkModel = {
  text: string;
  page: string[];
};
const vuetifyLinks:LinkModel[]=[
  {text:"v-card", page:["https://vuetifyjs.com/en/api/v-card/", "https://vuetifyjs.com/en/components/cards/"]},
  {text:"v-code", page:["https://vuetifyjs.com/en/api/v-code/"]}
];
</script>

<style scoped lang="scss">
// $code-background-color:rgb(var(--v-theme-code));
// $code-color	:rgb(var(--v-theme-on-code));
$code-background-color:rgb(0,0,0);
$code-color	:rgb(255,255,255);
$code-choose-color	:rgb(0,255,0);
.v-code {
  background-color: $code-background-color;
  color: $code-color;
}
.v-code .choose {
  color: $code-choose-color;
}
</style>
