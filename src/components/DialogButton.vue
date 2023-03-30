<template>
  <v-dialog
    v-model="showDialog"
    width="auto"
  >
    <template v-slot:activator>
      <v-btn @click="showDialog=true">{{ props.label? props.label : defProps.label }}</v-btn>
    </template>
    <slot></slot>
    <slot name="contents" :showDialog="showDialog" text="aaaaaa"></slot>
    <!-- TODO:閉じるボタンをSlot化したい（Stateを渡したい） -->
    <slot name="btnClose">
      <v-btn
        color="primary"
        variant="text"
        @click="showDialog = false"
      >
        Close(default)
      </v-btn>
    </slot>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
export type DialogButtonProps = {
  label?: string;
  show?: boolean;
}
interface DialogButtonEmits {
  (e: "update:showDialog", showDialog: boolean): void;
}
const defProps: DialogButtonProps = {
  label: "Open",
}
const props = defineProps<DialogButtonProps>();
const emits = defineEmits<DialogButtonEmits>();
const showDialog = ref<boolean>(props.show);
const computedEmits = computed({
  get: ()=> props.show,
  set: (value: boolean) => {
    emits("update:showDialog", value);
    // showDialog.value = props.show;
  },
});
</script>
