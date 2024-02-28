import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'

describe('WordleBoard', () => {
  it("a victory message is displayed when the user makes a guess that matches the word of the day", async () => {
    //arrange
    const wrapper = mount(WordleBoard, {props: {wordOfTheDay: "Testing"}})

    //act
    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue("Testing")
    await guessInput.trigger('keydown.enter')

    //assert
    expect(wrapper.text()).toContain("You win!")

  })
})
