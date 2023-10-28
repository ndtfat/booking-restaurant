import User from './User';

export default interface Review {
    _id: string;
    rate: { food: number; service: number; ambience: number };
    clientId: User;
    content: string;
    createdAt: string;
}
