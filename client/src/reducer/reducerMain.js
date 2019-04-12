const initialState = {
    restaurants: [],
    restaurant: null,
    loading: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                loading: true
            };
        case 'setRestaurants':
            return {
                ...state,
                restaurants: action.restaurants,
                restaurant: null,
                loading: false,
            };
        case 'setRestaurant':
            console.log(action.restaurant);
            return {
                ...state,
                restaurant: action.restaurant
            };
        default:
            throw new Error();
    }
};

export { initialState, reducer };