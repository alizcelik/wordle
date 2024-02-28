<script setup lang="ts">
import {DEFEAT_MESSAGE, VICTORY_MESSAGE} from "./settings";
import {ref} from "vue";

defineProps<{
  wordOfTheDay: string
}>()

const guessInProgress = ref("");
const submittedGuess = ref("");
</script>

<template>
  <input type="text" v-model="guessInProgress" @keydown.enter="submittedGuess = guessInProgress">
  <p v-if="submittedGuess.length > 0" v-text="submittedGuess === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"></p>
</template>
