import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import {DEFEAT_MESSAGE, VICTORY_MESSAGE} from "../settings";
import {beforeEach} from "vitest";

describe('WordleBoard', () => {
  let wordOfTheDay = "Testi";
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
  })

  async function playerSubmitGuess(guess: string) {
    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue(guess)
    await guessInput.trigger('keydown.enter')
  }

  describe("Test suite for end of the game messages", () => {
    test("a victory message is displayed when the user makes a guess that matches the word of the day", async () => {
      await playerSubmitGuess(wordOfTheDay);

      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })

    test("a defeat message is displayed when the user makes incorrect guesses", async () => {
      await playerSubmitGuess("WRONG")

      expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
    })
    test("no end-of-game message is displayed when the user has not made a guess yet", async () => {

      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
    })
  })

  describe("Test suite for rules of the word of the day", () => {
    test.each(
        [
          {wordOfTheDay:"FLY",reason: "word-of-the-day must have 5 characters long"},
          {wordOfTheDay:"Tests",reason: "word-of-the-day must be all uppercase letters"},
          {wordOfTheDay:"QWERT",reason: "word-of-the-day must be a real word"},
        ]
    )
    ("Since $reason: $wordOfTheDay is invalid, therefore a warning must be emitted", async (wordOfTheDay) => {
      // const spy = vi.spyOn(console, 'warn');
      //
      // spy.mockImplementation(() => null);

      console.warn = vi.fn();

      mount(WordleBoard, {props: {wordOfTheDay: wordOfTheDay}})

      expect(console.warn).toHaveBeenCalled();
    })

    test("no warning is emitted when the word of the day is valid", async () => {
      console.warn = vi.fn();

      mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})

      expect(console.warn).not.toHaveBeenCalled();
    })
  })

  describe("Test suite for the player input", () => {
    test.todo("player guesses are limited to 5 characters")
    test.todo("player guesses can only be submitted if they are real words")
    test.todo("player guesses are case-insensitive")
    test.todo("player guesses are limited to letters")
  })

})
