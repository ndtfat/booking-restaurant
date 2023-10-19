import User from './User';

export default interface Review {
    id: string;
    rate: { food: number; service: number; ambience: number };
    client: User;
    content: string;
}
