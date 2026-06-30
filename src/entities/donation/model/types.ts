export interface Donation {
	id: number;
	user_id: string;
	username: string;
	amount: number;
	message: string | null;
	created_at: number;
}