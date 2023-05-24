import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

describe("only allows maxWrong incorrect guesses", function () {
  it("letter buttons are hidden after making maxWrong guesses", function () {
    const word = "apple";
    const maxWrong = 6; //TODO: replace this

    const { container } = render(
      <Snowman words={[word]} maxWrong={maxWrong} />
    );

    const wrongLetters = "abcdefghijklmnopqrstuvwxyz"
      .split("")
      .filter((l) => !word.includes(l));

    const wrongButtons = wrongLetters.map((l) =>
      container.querySelector(`button[value="${l}"]`)
    );

    for (let i = 0; i < maxWrong; i++) {
      fireEvent.click(wrongButtons[i]);
    }

    const snowmanImage = container.querySelector(`img`);
    const imgAlt = snowmanImage.getAttribute("alt");

    expect(imgAlt).toEqual(String(maxWrong));

    const letterButtonContainer = container.querySelector(
      "#letterButtonContainer"
    );

    expect(letterButtonContainer).toHaveClass("hidden");
    expect(container).toMatchSnapshot();
  });
});
