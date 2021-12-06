import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CardList from "../CardList";


let container;
beforeAll(() => {
  const favlist =
    [
      {
        "reci_id": 3,
        "name": "test data 1",
        "minutes": 1485,
        "n_step": 13,
        "n_ingredient": 4
      },
      {
        "reci_id": 52,
        "name": "cafe cappuccino",
        "minutes": 5,
        "n_step": 4,
        "n_ingredient": 4
      },
      {
        "reci_id": 14106,
        "name": "roast beef horseradish spirals",
        "minutes": 70,
        "n_step": 5,
        "n_ingredient": 8
      }
    ];
  ({ container } = render(<CardList dataList={favlist} hasAction={false} />));

});

afterAll(cleanup);

describe('CardList scenario', () => {

  test("should mock 3 test data", () => {
    expect(container.getElementsByClassName('MuiPaper-root')).toHaveLength(3);
  });

  test("Verfiy all elements in card", () => {
    const recipe = container.getElementsByClassName('MuiPaper-root');
    for (let i = 0; i < recipe.length; i++) {
      expect(recipe[i]).toHaveTextContent('minutes');
      expect(recipe[i].querySelectorAll('a.MuiTypography-root[href^="Recipe_new?reci_id="]').length).toEqual(1);
      expect(recipe[i].getElementsByClassName('MuiTypography-subtitle1').length).toEqual(1);
      expect(recipe[i].getElementsByClassName('MuiSvgIcon-root').length).toEqual(1);
    }
  });

});