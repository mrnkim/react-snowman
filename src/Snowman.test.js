import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

describe("only allows maxWrong incorrect guesses", function () {
  it("image alt should be equal to maxWrong after maxWrong + 1 guesses",
    function () {

      const word = "apple";
      const maxWrong = 6; //TODO: replace this

      const { container } = render(
        <Snowman words={[word]} maxWrong={maxWrong} />
      );

      const wrongLetters = "abcdefghijklmnopqrstuvwxyz".split("")
        .filter(l => !word.includes(l));

      const wrongButtons = wrongLetters.map(l => container
        .querySelector(`button[value="${l}"]`));

      for (let i = 0; i < maxWrong + 1; i++) {
        fireEvent.click(wrongButtons[i]);
      }

      const snowmanImage = container.querySelector(`img`);
      const imgAlt = snowmanImage.getAttribute("alt");

      expect(imgAlt).toEqual(String(maxWrong));

      const letterButtonContainer = container
        .querySelector("#letterButtonContainer");

      expect(letterButtonContainer).not.toBeInTheDocument();
    });

  // end

  // it("matches winning game: 2C 3C 4C > 5C 6C", function () {
  //   _feedChoice("2C 3C 4C   5C 6C");
  //   const { container } = render(<NineteenGame />);
  //   fireEvent.click(container.querySelector("#draw"));
  //   expect(container).toMatchSnapshot();
  // });
  // // end

  // it("matches losing game: 2C 3C < 4C 5C", function () {
  //   _feedChoice("2C 3C   4C 5C");
  //   const { container } = render(<NineteenGame />);
  //   fireEvent.click(container.querySelector("#pass"));
  //   expect(container).toMatchSnapshot();
  // });
});