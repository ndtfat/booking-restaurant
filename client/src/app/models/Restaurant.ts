export interface Category {
    name: string;
    items: string[];
}

export default interface Restaurant {
    id: string;
    ownerId: string;
    rate: number;
    menu: Category[];
    name: string;
    desc: string;
    photos: string[];
    address: string;
    payments: string[];
    openTime: string;
    closeTime: string;
    isActive: boolean;
    phoneNumber: string;
    reservationSize: number;
}
