import React from "react";
import { render, cleanup, screen, getByText, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NavigationBar from "../navbar";


afterEach(cleanup);

describe('navigation bar and login/out scenario', () => {

  test("Should render the navigation bar", () => {
    const { container } = render(<NavigationBar />)
    expect(container.firstChild).toHaveClass('navbar');
    expect(getByText(container, 'Personal Meal Plan').closest('a')).toHaveAttribute('href', 'personalplan')
    expect(getByText(container, 'Home').closest('a')).toHaveAttribute('href', '/');
    expect(getByText(container, 'Healthy Diet').closest('a')).toHaveAttribute('href', '/');
    expect(getByText(container, 'Log in').closest('a')).toHaveAttribute('href', 'login');
    expect(window.sessionStorage.getItem('logged')).not.toEqual("1");
  });

  test("Login and logout status", async () => {
    global.alert = jest.fn();

    window.sessionStorage.setItem('logged', 1);
    let { container } = render(<NavigationBar />);
    expect(getByText(container, 'Log out'));
    expect(container.querySelectorAll('span.MuiIconButton-label').length).toEqual(2);
    expect(container.querySelector('button[aria-label="AccountBox"]')).toBeTruthy();
    fireEvent.click(container.querySelector('button[aria-label="AccountBox"]'));
    expect(window.sessionStorage.getItem('logged')).toEqual("1");

    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(
          [
            {
              "ingredient": "blueberries"
            },
            {
              "ingredient": "granulated sugar"
            },
            {
              "ingredient": "instant coffee"
            },
            {
              "ingredient": "lemon juice"
            },
            {
              "ingredient": "nonfat dry milk solid"
            },
            {
              "ingredient": "orange rind"
            },
            {
              "ingredient": "sugar"
            },
            {
              "ingredient": "vanilla yogurt"
            }
          ]
        )
      }));

    fireEvent.click(container.querySelector('span.MuiIconButton-label'));
    await waitFor(() => screen.getByText('My Shopping List'));
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(document.querySelectorAll('span.MuiTypography-body1').length).toEqual(8);
    expect(document.querySelectorAll('span.MuiTypography-body1')[6]).toHaveTextContent('sugar');
    

    fireEvent.click(getByText(container, 'Log out'));

    expect(global.alert).toHaveBeenCalledWith("You are logged out!");
    expect(window.sessionStorage.getItem('logged')).not.toEqual("1");

  });


});