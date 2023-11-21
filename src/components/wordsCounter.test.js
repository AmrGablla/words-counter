import { mount } from "@vue/test-utils";
import { expect, describe, it } from "vitest";
import wordsCounter from "./wordsCounter.vue";

describe("wordsCounter", () => {
  it("calc the write words count", async () => {
    const wrapper = mount(wordsCounter);

    const fileContent = "Hello, world!";
    const wordCount = { "hello,": 1, "world!": 1 };

    const result = wrapper.vm.countWords(fileContent);

    expect(result).toStrictEqual(wordCount);
  });

  it("clears data on button click", async () => {
    const wrapper = mount(wordsCounter);

    wrapper.vm.fileContent = "Hello, world!";
    wrapper.vm.wordCount = { "hello,": 1, "world!": 1 };

    await wrapper.find("button").trigger("click");

    expect(wrapper.vm.fileContent).toBe("");
    expect(wrapper.vm.wordCount).toEqual([]);
  });
});
