import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import {DEFEAT_MESSAGE, VICTORY_MESSAGE} from "../settings";

describe('WordleBoard', () => {
  let wordOfTheDay = "Testing";

  it("a victory message is displayed when the user makes a guess that matches the word of the day", async () => {
    const wrapper = mount(WordleBoard, {props: {wordOfTheDay}})

    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue("Testing")
    await guessInput.trigger('keydown.enter')

    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })

  test("a defeat message is displayed when the user makes incorrect guesses", async () => {
    const wrapper = mount(WordleBoard, {props: {wordOfTheDay}})

    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue("Wrong")
    await guessInput.trigger('keydown.enter')

    expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
  })
  it("no  end-of-game message is displayed when the user has not made a guess yet", async () => {
    const wrapper = mount(WordleBoard, {props: {wordOfTheDay}})

    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
    expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
  })

})
