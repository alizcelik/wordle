import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import {DEFEAT_MESSAGE, VICTORY_MESSAGE} from "../settings";
import {beforeEach} from "vitest";

describe('WordleBoard', () => {
  let wordOfTheDay = "Testing";
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
  })
  it("a victory message is displayed when the user makes a guess that matches the word of the day", async () => {

    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue("Testing")
    await guessInput.trigger('keydown.enter')

    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })

  test("a defeat message is displayed when the user makes incorrect guesses", async () => {

    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue("Wrong")
    await guessInput.trigger('keydown.enter')

    expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
  })
  it("no  end-of-game message is displayed when the user has not made a guess yet", async () => {

    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
    expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
  })

})
