export interface Menu {
    categories: string;
    items: string[];
}

export default interface Restaurant {
    id: string;
    name: string;
    desc: string;
    photos: string[];
    menu: Menu[];
    openTime: number;
    reservationTIme: string[];
    rate: number;
}
