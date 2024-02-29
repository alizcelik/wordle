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

  it("a victory message is displayed when the user makes a guess that matches the word of the day", async () => {
    await playerSubmitGuess(wordOfTheDay);

    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })

  test("a defeat message is displayed when the user makes incorrect guesses", async () => {
    await playerSubmitGuess("WRONG")

    expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
  })
  it("no  end-of-game message is displayed when the user has not made a guess yet", async () => {

    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
    expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
  })

  it("if a word of the day provided does not have exactly 5 letters, an warning emitted", async () => {
    // const spy = vi.spyOn(console, 'warn');
    //
    // spy.mockImplementation(() => null);

    console.warn = vi.fn();

    mount(WordleBoard, {props: {wordOfTheDay: "FLY"}})

    expect(console.warn).toHaveBeenCalled();
  })

  it("if the word of the day is not all in uppercase, an error is emitted", async () => {
    console.warn = vi.fn();

    mount(WordleBoard, {props: {wordOfTheDay: "Tests"}})

    expect(console.warn).toHaveBeenCalled();

  })

  it("if the word of the day is not a real English word, an error is emitted", async () => {
    console.warn = vi.fn();

    mount(WordleBoard, {props: {wordOfTheDay: "QWERT"}})

    expect(console.warn).toHaveBeenCalled();

  })
})
