import React from "react";
import { render, cleanup, fireEvent, waitFor, getByText, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LogIn from "../pages/LogIn";


afterEach(cleanup);

describe('Login page scenario', () => {

  test("Should render the page", () => {

    const { container, getByText } = render(<LogIn />);
    expect(getByText('Log in to your account')).toBeTruthy();

    let placeholder = ['Enter your username', 'Enter your password'];
    let input;
    for (let i = 0; i < 2; i++) {
      input = container.querySelector('input[placeholder=\'' + placeholder[i] + '\']');
      expect(input).toBeTruthy();
    }
    expect(getByText('Username')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
    expect(container.querySelector('.container button')).toHaveTextContent('Login');
  });

  test("Should login", async () => {
    const { container, getByText } = render(<LogIn />);
    expect(window.sessionStorage.getItem('logged')).not.toEqual("1");
    fireEvent.click(container.querySelector('button'));
    expect(window.sessionStorage.getItem('logged')).toEqual("1");

  });
});