import Restaurant from './Restaurant';

export default interface User {
    id: string;
    email: string;
    username: string;
    isRestaurantOwner: boolean;
    savedRestaurants: string[];
    accessToken: string;
    refreshToken: string;
}
