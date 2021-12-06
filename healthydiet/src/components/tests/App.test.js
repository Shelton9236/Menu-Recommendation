import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import App from "../../App";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe('App.js senario', () => {
  test("take a snapshot for App.js", () => {
    const { asFragment } = render(<App />);
    expect(asFragment(<App />)).toMatchSnapshot();
  });

  test('loads the app', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toHaveClass('App');
  });


});