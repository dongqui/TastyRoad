const initialState = {
    restaurants: [],
    restaurant: null,
    loading: false,
    reviews: []
};

const reducer = (state, action) => {
    const { type, restaurants, restaurant, reviews } = action;
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
                reviews: null,
                restaurant: null,
                loading: false,
            };
        case 'setRestaurant':
            return {
                ...state,
                restaurant,
                reviews: restaurant.reviews
            };
        case 'setReviews':
            return {
                ...state,
                reviews
            };
        default:
            throw new Error();
    }
};

export { initialState, reducer };