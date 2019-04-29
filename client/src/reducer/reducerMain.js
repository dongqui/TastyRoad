const initialState = {
    restaurants: [],
    restaurant: null,
    loading: false,
};

const reducer = (state, action) => {
    const { type, restaurants, restaurant} = action;
    switch (type) {
        case 'loading':
            return {
                ...state,
                loading: true
            };
        case 'setRestaurants':
            return {
                ...state,
                restaurants,
                restaurant: null,
                loading: false,
            };
        case 'setRestaurant':
            return {
                ...state,
                restaurant
            };
        default:
            throw new Error();
    }
};

export { initialState, reducer };