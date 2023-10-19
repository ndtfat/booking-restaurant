export default interface User {
    id: string;
    email: string;
    username: string;
    isRestaurantOwner: boolean;
    accessToken: string;
    refreshToken: string;
}
