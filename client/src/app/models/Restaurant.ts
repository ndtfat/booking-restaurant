export interface Category {
    name: string;
    items: string[];
}

export default interface Restaurant {
    id: string;
    name: string;
    desc: string;
    photos: string[];
    menu: Category[];
    openTime: number;
    reservationTIme: string[];
    rate: number;
}
