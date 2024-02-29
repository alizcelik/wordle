<script setup lang="ts">
import {DEFEAT_MESSAGE, VICTORY_MESSAGE} from "./settings";
import englishWords from "@/englishWordsWith5Letters";

import {ref} from "vue";

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string) => wordGiven.length === 5
        && wordGiven.toUpperCase() === wordGiven
        && englishWords.includes(wordGiven)
  }
})

const guessInProgress = ref("");
const submittedGuess = ref("");
</script>

<template>
  <input type="text" v-model="guessInProgress" @keydown.enter="submittedGuess = guessInProgress">
  <p v-if="submittedGuess.length > 0" v-text="submittedGuess === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"></p>
</template>
