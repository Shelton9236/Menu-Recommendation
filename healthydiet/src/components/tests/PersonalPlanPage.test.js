import React from "react";
import { render, cleanup, screen, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PersonalPlanPage from "../pages/PersonalPlanPage";

afterEach(cleanup);

describe('Personal plan page scenario', () => {

  test("should render the title", () => {
    const { getByText } = render(<PersonalPlanPage />);
    const title = getByText('Start healthy eating today');
    expect(title).toBeTruthy();
  });

  test("should render the placeholders", () => {
    const { container } = render(<PersonalPlanPage />);
    let placeholder = ['Name', 'Age', 'Height(m)', 'Weight(kg)', 'Ingredients separated by comma', 'Gender', 'Meal type', 'Dish type'];
    let input;
    for (let i = 0; i < 5; i++) {
      input = container.querySelector('input[placeholder=\'' + placeholder[i] + '\']');
      expect(input).toBeTruthy();
    }
    for (let i = 5; i < placeholder.length; i++) {
      input = container.querySelector('select[placeholder=\'' + placeholder[i] + '\']');
      expect(input).toBeTruthy();
    }
  });

  test("should render the options", () => {
    const { container } = render(<PersonalPlanPage />);
    let options = container.querySelectorAll('select[placeholder="Gender"] option');
    expect(options[0]).toHaveTextContent("Choose...");
    expect(options[1]).toHaveTextContent("Female");
    expect(options[2]).toHaveTextContent("Male");
    expect(options[3]).toHaveTextContent("I prefer not to say");

    options = container.querySelectorAll('select[placeholder="Meal type"] option');
    expect(options[0]).toHaveAttribute("value", "breakfast");
    expect(options[0]).toHaveTextContent("Breakfast");
    expect(options[1]).toHaveAttribute("value", "lunch");
    expect(options[1]).toHaveTextContent("Lunch");
    expect(options[2]).toHaveAttribute("value", "dinner");
    expect(options[2]).toHaveTextContent("Dinner");
    expect(options[3]).toHaveAttribute("value", "snack");
    expect(options[3]).toHaveTextContent("Snack");

    options = container.querySelectorAll('select[placeholder="Dish type"] option');
    expect(options[0]).toHaveAttribute("value", "maindish");
    expect(options[0]).toHaveTextContent("Main dish");
    expect(options[1]).toHaveAttribute("value", "sidedish");
    expect(options[1]).toHaveTextContent("Side dish");
    expect(options[2]).toHaveAttribute("value", "Appetizer");
    expect(options[2]).toHaveTextContent("Appetizer");

    options = container.querySelectorAll('select[data-testid="preparetime"] option');
    expect(options[0]).toHaveAttribute("value", "5");
    expect(options[0]).toHaveTextContent("5");
    expect(options[6]).toHaveAttribute("value", "35");
    expect(options[6]).toHaveTextContent("35");

    options = container.querySelectorAll('select[data-testid="region"] option');
    expect(options[0]).toHaveAttribute("value", "any");
    expect(options[0]).toHaveTextContent("Any");
    expect(options[1]).toHaveAttribute("value", "american");
    expect(options[1]).toHaveTextContent("American");
  });

  test("should render the button", () => {
    const { getByText } = render(<PersonalPlanPage />);
    const button = getByText('Get My Plan');
    expect(button).toBeTruthy();
  });

  test("should mock 3 suggestion", async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve([
          {
            "reci_id": 19909,
            "name": "veggie tex mex tortilla wraps",
            "minutes": 5,
            "n_step": 4,
            "n_ingredient": 10,
            "calorie": 209,
            "protein": 19,
            "totalcarbon": 12,
            "totalfat": 4
          },
          {
            "reci_id": 493131,
            "name": "super porridge",
            "minutes": 5,
            "n_step": 5,
            "n_ingredient": 4,
            "calorie": 152,
            "protein": 13,
            "totalcarbon": 8,
            "totalfat": 4
          },
          {
            "reci_id": 5377,
            "name": "large vegetable and cheese strata",
            "minutes": 0,
            "n_step": 10,
            "n_ingredient": 13,
            "calorie": 332,
            "protein": 40,
            "totalcarbon": 3,
            "totalfat": 36
          }]
        )
      }));
    const { container, getByText } = render(<PersonalPlanPage />);
    // fireEvent.change(getByPlaceholderText('Gender'), { target: { value: 'female' } });
    fireEvent.click(getByText('Get My Plan'));
    await wait();

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const recipe = container.getElementsByClassName('card');
    const reci_id = [19909, 493131, 5377];
    for (let i = 0; i < recipe.length; i++) {
      expect(recipe[i].getElementsByClassName('card-title').length).toEqual(1);
      expect(recipe[i].getElementsByClassName('card-body').length).toEqual(1);
      expect(recipe[i]).toHaveTextContent('minutes');
      expect(recipe[i]).toHaveTextContent('Ingredient(s)');
      expect(recipe[i]).toHaveTextContent('Step(s)');
      expect(recipe[i].querySelector('button a')).toHaveAttribute('href', 'Recipe?reci_id=' + reci_id[i]);
      expect(recipe[i].querySelector('button a')).toHaveTextContent('Full Recipe');
    }
    global.fetch.mockClear();

  });


});