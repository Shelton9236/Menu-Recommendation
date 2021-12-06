import React from "react";
import { cleanup, render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserPage from "../pages/UserPage";

afterEach(cleanup);

describe('User page scenario', () => {

  test("Click the Favorites and Originals button", () => {
    const props = {
      isLoggedIn: false,
      username: "liumaoxing",
      password: "",
    };
    const { container, queryAllByText, getByText } = render(<UserPage {...props} />);
    fireEvent.click(getByText('Favorites'));
    expect(queryAllByText('Add a new recipe')).toEqual([]);
    fireEvent.click(getByText('Originals'));
    // screen.debug();
    expect(container.querySelector('.container button').closest('a')).toHaveAttribute('href', 'Create?user=null');
  });

});