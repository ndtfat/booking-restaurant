export default interface Reservation {
    id: string;
    clientId: string;
    restaurantId: string;
    date: string;
    time: string;
    state: string;
    numberOfGuests: number;
}
