<script setup lang="ts">
import {DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE} from "./settings";
import englishWords from "../englishWordsWith5Letters.json";
import {computed, ref} from "vue";


const guessInProgress = ref<string|null>(null);

const emit = defineEmits<{
  "submitted-guess": [guess: string]
}>();


const formattedGuessInProgress = computed<string>({
  get: () => guessInProgress.value ?? "",
  set: (newValue: string) => {
    guessInProgress.value = null
    guessInProgress.value = newValue
        .slice(0, WORD_SIZE)
        .toUpperCase()
        .replace(/[^A-Z]+/gi, "")
  }
});

function onSubmit(){
  if(!englishWords.includes(formattedGuessInProgress.value)){
    return;
  }
  emit("submitted-guess", formattedGuessInProgress.value);
}
</script>

<template>
  <input type="text" v-model="formattedGuessInProgress"
         maxlength="WORD_SIZE"
         inputmode="text"
         @keydown.enter="onSubmit">
</template>
