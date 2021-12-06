import * as React from "react";
import RecipePage from "../pages/Recipe";
import { cleanup, render, screen, getByText, waitFor } from "@testing-library/react";


let container;
beforeEach(async () => {
  const props = {
    location: {
      "pathname": "/Recipe",
      "search": "?reci_id=50390",
      "hash": ""
    }
  };

  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve({
        "name": "heavenly hash cake",
        "description": "",
        "step": [
          "preheat oven to 350",
          "cream butter and sugar: add eggs",
          "stir in sifted dry ingredients and mix well",
          "add pecans and vanilla",
          "bake in greased 13x9 pan for 40 minutes",
          "immediately after removing from oven , cover surface of cake with marshmallows",
          "icing: beat together all ingredients until smooth",
          "pour icing over hot marshamllow-covered cake",
          "allow o cool , cut into squares"
        ],
        "ingredient": [
          "butter",
          "sugar",
          "eggs",
          "flour",
          "baking powder",
          "cocoa",
          "pecans",
          "vanilla",
          "mini marshmallows",
          "powdered sugar",
          "evaporated milk"
        ],
        "calorie": 361,
        "totalfat": 27,
        "totalcarbon": 16,
        "protein": 7
      })
    }))
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve([
      ])
    }))
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve(
        {
          "url": ""
          // "url": "https://img.sndimg.com:443/food/image/upload/c_thumb,q_80,w_721,h_406/v1/img/recipes/38/YUeirxMLQaeE1h3v3qnM_229 berry blue frzn dess.jpg"
        })
    }
    ));

  // container = render(<RecipePage {...props} />);    
  ({ container } = render(<RecipePage {...props} />));
  await waitFor(() => screen.getByText('Comment'));
});

afterEach(cleanup);


describe("Homepage scenario", () => {


  test('Should render recipe when comment is empty', async () => {
    expect(global.fetch).toHaveBeenCalledTimes(3);

    expect(getByText(container, "Back Home")).toBeTruthy();

    //render all data
    // expect(container.getElementsByClassName('MuiTypography-h2').length).toEqual(1);
    expect(container.querySelectorAll('h2.MuiTypography-root').length).toEqual(1);

    expect(container.querySelector('.MuiContainer-root div:nth-child(3) h6.MuiTypography-subtitle1')).toBeTruthy();
    expect(getByText(container, 'Calories')).toBeTruthy();
    expect(getByText(container, 'Total Fat(g)')).toBeTruthy();
    expect(getByText(container, 'Carbs(g)')).toBeTruthy();
    expect(container.querySelectorAll('.MuiListItemText-root .MuiTypography-body1').length).toEqual(4);
    expect(getByText(container, 'Protein(g)')).toBeTruthy();
    expect(getByText(container, 'Ingredients')).toBeTruthy();
    expect(container.querySelectorAll('.MuiGrid-root .MuiPaper-root:nth-child(4) span.MuiChip-label').length).not.toEqual(0);
    expect(getByText(container, 'Directions')).toBeTruthy();
    expect(container.querySelectorAll('p.MuiTypography-body2').length).not.toEqual(0);

    expect(getByText(container, 'Favourites')).toBeTruthy();
    expect(getByText(container, 'Shopping List')).toBeTruthy();
    expect(getByText(container, 'Rate this recipe')).toBeTruthy();
    expect(getByText(container, '0-5 Stars')).toBeTruthy();
    // expect(getByText(container, '0.5 Stars')).toBeTruthy();
    // expect(getByText(container, '1 Stars')).toBeTruthy();
    // expect(getByText(container, '1.5 Stars')).toBeTruthy();
    // expect(getByText(container, '2 Stars')).toBeTruthy();
    // expect(getByText(container, '2.5 Stars')).toBeTruthy();
    // expect(getByText(container, '3 Stars')).toBeTruthy();
    // expect(getByText(container, '3.5 Stars')).toBeTruthy();
    // expect(getByText(container, '4 Stars')).toBeTruthy();
    // expect(getByText(container, '4.5 Stars')).toBeTruthy();
    // expect(getByText(container, '5 Stars')).toBeTruthy();
    expect(getByText(container, 'Name')).toBeTruthy();
    expect(getByText(container, 'Comment')).toBeTruthy();
    expect(container.querySelector('input[placeholder="Your name here"]')).toBeTruthy();
    expect(container.querySelector('textarea[placeholder="Comment on this recipe!"]')).toBeTruthy();
    expect(getByText(container, 'Submit')).toBeTruthy();

    expect(getByText(container, 'Reviews')).toBeTruthy();
    expect(container.querySelectorAll('div.MuiCardContent-root')).toHaveLength(0);
    // screen.debug(null, 50000);
    expect(getByText(container, 'Sorry, no comments for this recipe at this moment.')).toBeTruthy();
  });

});
