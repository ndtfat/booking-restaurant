import Restaurant from './Restaurant';

export default interface User {
    id: string;
    email: string;
    username: string;
    isRestaurantOwner: boolean;
    savedRestaurants: Restaurant[];
    accessToken: string;
    refreshToken: string;
}
