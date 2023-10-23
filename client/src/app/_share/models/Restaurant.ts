export interface Category {
    category: string;
    items: { name: string; price: number }[];
}

export default interface Restaurant {
    _id: string;
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
    cuisines?: string[];
}
