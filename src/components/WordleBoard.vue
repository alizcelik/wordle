<script setup lang="ts">
import {DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE} from "./settings";
import englishWords from "../englishWordsWith5Letters.json";
import {computed, ref} from "vue";
import GuessInput from "@/components/GuessInput.vue";

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string) => englishWords.includes(wordGiven)
  }
})

const guessInProgress = ref<string|null>(null);
const submittedGuess = ref("");



</script>

<template>
  <guess-input @submitted-guess="guess => submittedGuess = guess"/>
  <p v-if="submittedGuess.length > 0"
     v-text="submittedGuess.toUpperCase() === wordOfTheDay?.toUpperCase() ? VICTORY_MESSAGE : DEFEAT_MESSAGE"></p>
</template>
