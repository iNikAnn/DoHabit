export interface Donation {
	id: number;
	username: string;
	amount: number;
	message: string | null;
	created_at: number;
}