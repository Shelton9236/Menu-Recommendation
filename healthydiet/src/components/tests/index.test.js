import * as React from "react";
import { render, cleanup, getByText, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "../pages/index";
import "@testing-library/jest-dom/extend-expect";

let container;
let reci_id;
beforeEach(() => {
    reci_id = [115537, 354023];

    var axios = require("axios");
    var MockAdapter = require("axios-mock-adapter");
    var mock = new MockAdapter(axios);

    mock.onGet('/api/frontpage').reply(function (config) {
        console.log(config.params.tag);

        if (config.params.tag === null) { 
            return [200, [{
                "reci_id": 115537,
                "name": "a unique and delicious braided bread",
                "minutes": 165,
                "n_step": 15,
                "n_ingredient": 8
            }, {
                "reci_id": 354023,
                "name": "pineapple cheesecake danish",
                "minutes": 35,
                "n_step": 17,
                "n_ingredient": 13
            }]];
        } else if (config.params.tag === "breakfast") {
            return [200, [{
                "reci_id": 12345,
                "name": "testbreakfast",
                "minutes": 12345,
                "n_step": 12345,
                "n_ingredient": 12345
            }]]
        } else if (config.params.tag === "lunch") {
            return [200, [{
                "reci_id": 12345,
                "name": "testlunch",
                "minutes": 12345,
                "n_step": 12345,
                "n_ingredient": 12345
            }]]
        } else {
            return [200, [{
                "reci_id": 12345,
                "name": "testfilter",
                "minutes": 12345,
                "n_step": 12345,
                "n_ingredient": 12345
            }]]
        }
    });
    // axios
    //     .get("/api/frontpage", { params: { tag: null } })
    //     .then(function (response) {
    //         ({ container } = render(<HomePage />));
    //     });

    // axios
    //     .get("/api/frontpage", { params: { tag: 'seafood' } })
    //     .then(function (response) {
    //         // rerender(<HomePage />);
    //         // await waitFor(() => screen.getByText('12345'))
    //     });

    ({ container } = render(<HomePage />));

});
afterEach(cleanup);

describe("Homepage scenario", () => {
    test("should mock 2 recipes", async () => {
        expect(await container.getElementsByClassName('card')).toHaveLength(2);

        const recipe = await container.getElementsByClassName('card');
        for (let i = 0; i < recipe.length; i++) {
            expect(recipe[i].getElementsByClassName('card-title').length).toEqual(1);
            expect(recipe[i].getElementsByClassName('card-body').length).toEqual(1);
            expect(recipe[i]).toHaveTextContent('minutes');
            expect(recipe[i]).toHaveTextContent('Ingredient(s)');
            expect(recipe[i]).toHaveTextContent('Step(s)');
            // expect(getByText(recipe[i], 'Full Recipe')).toHaveAttribute('href', expect.stringContaining('Recipe?reci_id='));
            expect(getByText(recipe[i], 'Full Recipe')).toHaveAttribute('href', 'Recipe?reci_id=' + reci_id[i]);
        }
    });

    test("should render filter", () => {
        expect(container.querySelectorAll('button.MuiButtonBase-root span.MuiToggleButton-label').length).toEqual(7);

        const button = container.querySelectorAll('button.MuiButtonBase-root span.MuiToggleButton-label');
        const filter = ['Breakfast', 'Lunch', 'Dinner', 'Asian', 'Seafood', 'Holiday/Event', 'Birthday'];
        for (let i = 0; i < filter.length; i++) {
            expect((button[i]).textContent).toEqual(filter[i]);
        }
    });


    test("click filter should render different data", async () => {
        fireEvent.click(getByText(container, 'Breakfast'));
        // rerender(<HomePage />);
        await waitFor(() => screen.getByText('Full Recipe'));
        expect(await container.getElementsByClassName('card')).toHaveLength(1);
        expect(getByText(container, 'testbreakfast')).toBeTruthy();

        fireEvent.click(getByText(container, 'Lunch'));
        await waitFor(() => screen.getByText('Full Recipe'));
        expect(await container.getElementsByClassName('card')).toHaveLength(1);
        expect(getByText(container, 'testlunch')).toBeTruthy();

        fireEvent.click(getByText(container, 'Seafood'));
        await waitFor(() => screen.getByText('Full Recipe'));
        expect(await container.getElementsByClassName('card')).toHaveLength(1);
        expect(getByText(container, 'testfilter')).toBeTruthy();
    });

});