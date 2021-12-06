import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateRecipe from "../pages/CreateRecipe";

let container;
beforeEach(() => {
  const props = {
    location: {
      "pathname": "/Create",
      "search": "?user=liumaoxing",
      "hash": ""
    }
  };
  ({ container } = render(<CreateRecipe {...props} />));
});
afterEach(cleanup);


describe('Personal plan page scenario', () => {

  test("should render the placeholders", async () => {
    let placeholder = ['Recipe Name', 'Time (minutes)', 'Ingredients', 'Simply Describe The Recipe', 'Steps'];
    for (let i = 0; i < 3; i++) {
      expect(container.querySelector('input[placeholder=\'' + placeholder[i] + '\']')).toBeTruthy();
    }
    for (let i = 3; i < placeholder.length; i++) {
      expect(container.querySelector('textarea[placeholder=\'' + placeholder[i] + '\']')).toBeTruthy();
    }
  });

  test("should render the labels", () => {
    const labeltext = ['Name', 'Description', 'Time', 'Ingredients (seperated by comma ",")', 'Steps (seperated by semicolon ";")'];
    const label = container.querySelectorAll('label.form-label');
    for (let i = 0; i < label.length; i++) {
      expect(label[i]).toHaveTextContent(labeltext[i]);
    }

  });

  test("should render the button", () => {
    expect(container.querySelector('.container button')).toHaveTextContent('Submit');
    global.alert = jest.fn();
    fireEvent.click(container.querySelector('.container button'));
    expect(global.alert).toHaveBeenCalledWith("Your recipe was submitted!");
  });


});