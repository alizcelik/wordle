<script setup lang="ts">
import {DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE} from "./settings";
import englishWords from "@/englishWordsWith5Letters";

import {computed, ref} from "vue";

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string) => englishWords.includes(wordGiven)
  }
})

const guessInProgress = ref("");
const submittedGuess = ref("");

const formattedGuessInProgress = computed({
  get: () => guessInProgress.value,
  set: (newValue: string) => guessInProgress.value = newValue.slice(0, WORD_SIZE)
});
</script>

<template>
  <input type="text" v-model="formattedGuessInProgress"
         maxlength="5"
         @keydown.enter="submittedGuess = guessInProgress">
  <p v-if="submittedGuess.length > 0" v-text="submittedGuess === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"></p>
</template>
