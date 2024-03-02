<script setup lang="ts">
import {DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE} from "./settings";
import englishWords from "../englishWordsWith5Letters.json";
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
  set: (newValue: string) => guessInProgress.value = newValue
      .slice(0, WORD_SIZE)
      .toUpperCase()
      .replace(/[^A-Z]/gi, "")
});

function onSubmit(){
  if(!englishWords.includes(guessInProgress.value.toUpperCase())){
    return;
  }
  submittedGuess.value = guessInProgress.value;
}
</script>

<template>
  <input type="text" v-model="formattedGuessInProgress"
         maxlength="WORD_SIZE"
         inputmode="text"
         @keydown.enter="onSubmit">
  <p v-if="submittedGuess.length > 0"
     v-text="submittedGuess.toUpperCase() === wordOfTheDay?.toUpperCase() ? VICTORY_MESSAGE : DEFEAT_MESSAGE"></p>
  <p>Guess: {{ guessInProgress }}</p>
  <p>Submitted Guess: {{ submittedGuess }}</p>
  <p>Formatted Guess: {{ formattedGuessInProgress }}</p>
  <p>Word of the day: {{ wordOfTheDay }}</p>
</template>
