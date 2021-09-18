export interface Pet {
    id?: number;
    name: string;
    status: 'AVAILABLE' | 'PENDING' | 'SOLD';
    category_id: number;
}
