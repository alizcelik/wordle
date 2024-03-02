import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import {DEFEAT_MESSAGE, VICTORY_MESSAGE} from "../settings";
import {beforeEach, expect} from "vitest";

describe('WordleBoard', () => {
  let wordOfTheDay = "Tests";
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
    beforeEach(() => {
      console.warn = vi.fn();
    });

    test.each(
        [
          {wordOfTheDay:"FLY", reason: "word-of-the-day must have 5 characters long"},
          {wordOfTheDay:"Tests", reason: "word-of-the-day must be all uppercase letters"},
          {wordOfTheDay:"QWERT", reason: "word-of-the-day must be a real word"},
        ]
    )
    ("Since $reason: $wordOfTheDay is invalid, therefore a warning must be emitted", async ({wordOfTheDay}) => {
      // const spy = vi.spyOn(console, 'warn');
      //
      // spy.mockImplementation(() => null);

      mount(WordleBoard, {props: {wordOfTheDay: wordOfTheDay}})

      expect(console.warn).toHaveBeenCalled();
    })

    test("no warning is emitted when the word of the day is valid", async () => {
      mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})

      expect(console.warn).not.toHaveBeenCalled();
    })
  })

  describe("Test suite for the player input", () => {

    test("player guesses are limited to 5 characters", async () => {
      await playerSubmitGuess(wordOfTheDay + "EXTRA")

      expect(wrapper.text()).toContain(VICTORY_MESSAGE);
    })

    test("player guesses can only be submitted if they are real words", async () => {
      await playerSubmitGuess("QWERT")

      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE);
    })

    test("player guesses are case-insensitive", async () => {
      await playerSubmitGuess(wordOfTheDay.toLowerCase())

      expect(wrapper.text()).toContain(VICTORY_MESSAGE);
    })

    test("player guesses are limited to letters", async () => {
      await playerSubmitGuess("H3!RT")

      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE);
      expect(wrapper.find<HTMLInputElement>('input[type=text]').element.value).toEqual("HRT");
    })

    test("non-letter characters do not render on the screen while being typed", async () => {
      await playerSubmitGuess("333")

      expect(wrapper.find<HTMLInputElement>('input[type=text]').element.value).toEqual("");

    })
  })

})
